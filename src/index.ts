import { Parser } from '@asyncapi/parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser';

const parser = new Parser();
parser.registerSchemaParser(AvroSchemaParser()); 

const asyncapiWithInvalidAvro = `
asyncapi: 2.0.0
info:
  title: Example with Avro
  version: 0.1.0
channels:
  example:
    publish:
      message:
        schemaFormat: 'application/vnd.apache.avro;version=1.9.0'
        payload:
          type: notAValidAvroType
`;

async function validate() {
  const { diagnostics } = await parser.parse(asyncapiWithInvalidAvro);
  console.log(diagnostics);
  console.log("DONE");
}
validate();