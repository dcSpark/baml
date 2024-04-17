// This file is auto-generated. Do not edit this file manually.
//
// Disable formatting for this file to avoid linting errors.
// tslint:disable
// @ts-nocheck
/* eslint-disable */


import { GPT4 } from '../client';
import { GetQuery } from '../function';
import { schema } from '../json_schema';
import { Deserializer } from '@boundaryml/baml-core/deserializer/deserializer';


// Impl: default_config
// Client: GPT4
// An implementation for GetQuery


const prompt_template = `Extract the following information from the query:

Query:
<<<<
{{ query }}
<<<<

OUTPUT_JSON_SCHEMA:
{{ ctx.output_schema }}

Before OUTPUT_JSON_SCHEMA, list 5 intentions the user may have.
--- EXAMPLES ---
1. <intent>
2. <intent>
3. <intent>
4. <intent>
5. <intent>

{
    ... // OUTPUT_JSON_SCHEMA
}`;
const output_schema = `{
  // In ISO duration format, e.g. P1Y2M10D.
  "dateRange": int | null,
  "location": string[],
  // An exact job title, not a general category.
  "jobTitle": {
    "value": string,
    // Why the value is a good fit.
    "reasoning": string
  } | null,
  // The exact name of the company, not a product or service.
  "company": {
    "value": string,
    // Why the value is a good fit.
    "reasoning": string
  } | null,
  // Any specific projects or features the user is looking for.
  "description": {
    "value": string,
    // Why the value is a good fit.
    "reasoning": string
  }[],
  "tags": ("Tag as string" | string)[]
}

Tag
---
Security
AI
Blockchain`;

const template_macros = [
]

const deserializer = new Deserializer<SearchParams>(schema, {
  $ref: '#/definitions/GetQuery_output'
});

GetQuery.registerImpl('default_config', async (
  args: {
    query: string
  }
): Promise<SearchParams> => {
    const result = await GPT4.run_jinja_template(
      prompt_template,
      args,
      output_schema,
      template_macros,
    );

    return deserializer.coerce(result.generated);
  }
);


