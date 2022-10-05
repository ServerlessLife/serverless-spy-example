#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ServerlessSpyExampleStack } from '../lib/serverless-spy-example-stack';

const app = new cdk.App();
new ServerlessSpyExampleStack(app, 'ServerlessSpyExampleStack');
