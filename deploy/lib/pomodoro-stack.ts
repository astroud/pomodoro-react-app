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
import { DockerImageAsset } from "@aws-cdk/aws-ecr-assets";
import { Repository } from "@aws-cdk/aws-ecr";
import * as path from "path";
import * as ecrDeploy from "cdk-ecr-deployment";

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

    // Create an ECR repository. A repository acts like a namespace to hold
    // images that adhere to the OCI image specification
    const repository = new Repository(this, `${props.prefix}-pomodoroRepo`, {
      repositoryName: "pomodoro",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Build an image asset from the Dockerfile
    const image = new DockerImageAsset(this, `${props.prefix}-pomodoroImage`, {
      directory: path.join(__dirname, "..", ".."),
    });

    // Define the ECR image uri and tag for the image inside the ECR Repository
    const deployRepository = `${repository.repositoryUri}:${props.repositoryTag}`;
    new ecrDeploy.ECRDeployment(this, `${props.prefix}-deployDockerImage`, {
      src: new ecrDeploy.DockerImageName(image.imageUri),
      dest: new ecrDeploy.DockerImageName(deployRepository),
    });

    const destinationRepo = Repository.fromRepositoryName(
      this,
      `${props.prefix}-destinationRepo`,
      repository.repositoryName
    );

    // Create the dashboard container for the ECS service using the repository
    // name and tag we created earlier
    const pomodoroContainer = pomodoroTask.addContainer(
      `${props.prefix}-pomodoro`,
      {
        image: ContainerImage.fromEcrRepository(
          destinationRepo,
          props.repositoryTag
        ),
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
