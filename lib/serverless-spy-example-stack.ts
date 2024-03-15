import { CfnOutput, Duration, Stack, StackProps } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import path = require("path");
import { ServerlessSpy } from "serverless-spy";
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";

export class ServerlessSpyExampleStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const dynamoDb = new dynamodb.Table(this, "MyTable", {
      partitionKey: { name: "pk", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const func = new NodejsFunction(this, "MyLambda", {
      memorySize: 512,
      timeout: Duration.seconds(5),
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "handler",
      entry: path.join(__dirname, "../functions/toDynamoDb.ts"),
      environment: {
        DYNAMODB_TABLE_NAME: dynamoDb.tableName,
        NODE_OPTIONS: "--enable-source-maps",
      },
    });
    dynamoDb.grantWriteData(func);

    const serverlessSpy = new ServerlessSpy(this, "ServerlessSpy", {
      generateSpyEventsFileLocation:
        "serverlessSpyEvents/ServerlessSpyEvents.ts",
    });

    serverlessSpy.spy();

    new CfnOutput(this, `FunctionName${serverlessSpy.getConstructName(func)}`, {
      value: func.functionName,
    });
  }
}
