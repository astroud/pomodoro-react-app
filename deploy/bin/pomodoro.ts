#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import { PomodoroStack } from "../lib/pomodoro-stack";

// Add a prefix so that multiple deployments can exist
// and pass props down to the stack resources
let prefix = process.env.STACK_PREFIX || "development";

// Instantiate the base cdk app construct to hold our cloudformation stacks
const app = new App();

// Create the dashboard stack
const props = {
  prefix: prefix,
  repositoryTag: "1.0.0",
};
new PomodoroStack(app, `${prefix}-PomodoroStack`, props);
