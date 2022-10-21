import { Input, Parser } from '@asyncapi/parser';
import { AvroSchemaParser } from '@asyncapi/avro-schema-parser/esm';

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

async function validate(doc: Input) {
  const { document, diagnostics } = await parser.parse(doc);
  console.log(diagnostics);
}

validate(asyncapiWithInvalidAvro);

console.log("DONE");