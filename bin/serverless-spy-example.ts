#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ServerlessSpyExampleStack } from "../lib/serverless-spy-example-stack";
import { TestStack } from "../lib/test-stack";

const app = new cdk.App();

new TestStack(app, "TestStack");
new ServerlessSpyExampleStack(app, "ServerlessSpyExampleStack");
