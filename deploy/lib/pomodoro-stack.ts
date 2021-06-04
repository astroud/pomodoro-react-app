import * as cdk from "@aws-cdk/core";
import { Vpc, SecurityGroup } from "@aws-cdk/aws-ec2";
import {
  AwsLogDriver,
  Cluster,
  ContainerImage,
  FargateTaskDefinition,
} from "@aws-cdk/aws-ecs";
import { LogGroup, RetentionDays } from "@aws-cdk/aws-logs";
import { ApplicationLoadBalancedFargateService } from "@aws-cdk/aws-ecs-patterns";
import { ApplicationProtocol } from "@aws-cdk/aws-elasticloadbalancingv2";

// PomodoroStackProps are required properties to create a new Pomodoro App
export interface PomodoroStackProps extends cdk.StackProps {
  prefix: string;
  repositoryTag: string;
}

// Pomodoro stack creates the ECS service.
export class PomodoroStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: PomodoroStackProps) {
    super(scope, id, props);

    // create the VPC and the ECS cluster that will hold the service
    const vpc = new Vpc(this, `${props.prefix}-vpc`, {
      cidr: "10.0.0.0/24",
      maxAzs: 2,
    });

    // create a custom security group
    const secGroup = new SecurityGroup(this, `${props.prefix}-secGroup`, {
      vpc,
    });

    const cluster = new Cluster(this, `${props.prefix}-cluster`, {
      vpc: vpc,
    });

    // create a log group in Cloudwatch
    const logGroup = new LogGroup(this, `${props.prefix}-pomodoroLogGroup`, {
      logGroupName: `${props.prefix}-pomodoroLogGroup`,
      retention: RetentionDays.ONE_WEEK,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create an ECS Fargate Task from the newly create ECR repository. This task
    // tells ECS Service how to run the dashboard container.
    const pomodoroTask = new FargateTaskDefinition(
      this,
      `${props.prefix}-pomodoroTask`,
      {
        cpu: 512,
        memoryLimitMiB: 2048,
      }
    );

    // Create the dashboard container for the ECS service using the repository
    // name and tag we created earlier
    const pomodoroContainer = pomodoroTask.addContainer(
      `${props.prefix}-pomodoro`,
      {
        image: ContainerImage.fromRegistry("chrisdontmiss/pomodoro:1.0.0"),
        logging: new AwsLogDriver({
          streamPrefix: `${props.prefix}-pomodoro`,
          logGroup,
        }),
      }
    );

    // Map Dockerfile exposed port 80 to host port
    pomodoroContainer.addPortMappings({ containerPort: 80, hostPort: 80 });

    // Create the ECS Fargate service and place into the ECS cluster.
    new ApplicationLoadBalancedFargateService(
      this,
      `${props.prefix}-pomodoroService`,
      {
        serviceName: "pomodoro",
        cluster,
        cpu: 512,
        protocol: ApplicationProtocol.HTTP,
        taskDefinition: pomodoroTask,
        memoryLimitMiB: 2048,
        publicLoadBalancer: true,
        securityGroups: [secGroup],
      }
    );
  }
}
