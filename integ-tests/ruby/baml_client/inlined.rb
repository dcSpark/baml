###############################################################################
#
#  Welcome to Baml! To use this generated code, please run the following:
#
#  $ bundle add baml sorbet-runtime sorbet-struct-comparable
#
###############################################################################

# This file was generated by BAML: please do not edit it. Instead, edit the
# BAML files and re-generate this code.
#
# frozen_string_literal: true
# rubocop: disable
# formatter:off
module Baml
  module Inlined
    FILE_MAP = {
        
        "clients.baml" => "retry_policy Bar {\n  max_retries 3\n  strategy {\n    type exponential_backoff\n  }\n}\n\nretry_policy Foo {\n  max_retries 3\n  strategy {\n    type constant_delay\n    delay_ms 100\n  }\n}\n\nclient<llm> GPT4 {\n  provider openai\n  options {\n    model gpt-4o\n  }\n}  \n\n\nclient<llm> GPT4o {\n  provider openai\n  options {\n    model gpt-4o\n    api_key env.OPENAI_API_KEY\n  }\n} \n\n\nclient<llm> GPT4Turbo {\n  retry_policy Bar\n  provider openai\n  options {\n    model gpt-4-turbo\n    api_key env.OPENAI_API_KEY\n  }\n} \n\nclient<llm> GPT35 {\n  provider openai\n  options {\n    model \"gpt-3.5-turbo\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> GPT35LegacyProvider {\n  provider openai \n  options {\n    model \"gpt-3.5-turbo\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\n\nclient<llm> Ollama {\n  provider ollama\n  options {\n    model llama2\n  }\n}\n\nclient<llm> GPT35Azure {\n  provider azure-openai\n  options {\n    resource_name \"west-us-azure-baml\"\n    deployment_id \"gpt-35-turbo-default\"\n    // base_url \"https://west-us-azure-baml.openai.azure.com/openai/deployments/gpt-35-turbo-default\"\n    api_version \"2024-02-01\"\n    api_key env.AZURE_OPENAI_API_KEY\n  }\n}\n\nclient<llm> Gemini {\n  provider google-ai\n  options {\n    model \"gemini-1.5-pro-001\"\n    api_key env.GOOGLE_API_KEY\n    safetySettings {\n      category HARM_CATEGORY_HATE_SPEECH\n      threshold BLOCK_LOW_AND_ABOVE\n\n    }\n  }\n}\n\nclient<llm> Vertex {\n  provider vertex-ai  \n  options {\n    model \"gemini-1.5-pro\"\n    project_id anish-testing-426119\n    location us-central1\n\n  }\n}\n\n\nclient<llm> AwsBedrock {\n  provider aws-bedrock\n  options {\n    inference_configuration {\n      max_tokens 100\n    }\n    model_id \"anthropic.claude-3-haiku-20240307-v1:0\"\n    // model_id \"meta.llama3-8b-instruct-v1:0\"\n    // model_id \"mistral.mistral-7b-instruct-v0:2\"\n    api_key \"\"\n  }\n}\n\nclient<llm> Claude {\n  provider anthropic\n  options {\n    model claude-3-haiku-20240307\n    api_key env.ANTHROPIC_API_KEY\n    max_tokens 1000\n  }\n}\n\nclient<llm> Resilient_SimpleSyntax {\n  retry_policy Foo\n  provider baml-fallback\n  options {\n    strategy [\n      GPT4Turbo\n      GPT35\n      Lottery_SimpleSyntax\n    ]\n  }\n} \n \nclient<llm> Lottery_SimpleSyntax {\n  provider baml-round-robin\n  options {\n    start 0\n    strategy [\n      GPT35\n      Claude\n    ]\n  }\n}\n",
        "main.baml" => "generator lang_python {\n  output_type \"python/pydantic\"\n  output_dir \"../python\"\n  version \"0.51.0\"\n}\n\ngenerator lang_typescript {\n  output_type typescript\n  output_dir \"../typescript\"\n  version \"0.51.0\"\n}\n\ngenerator lang_ruby {\n  output_type \"ruby/sorbet\"\n  output_dir \"../ruby\"\n  version \"0.51.0\"\n}\n",
        "test-files/aliases/classes.baml" => "\n\n\nclass TestClassAlias {\n  key string @alias(\"key-dash\")   \n  @description(#\"\n    This is a description for key\n    af asdf\n  \"#)\n  key2 string @alias(\"key21\")\n  key3 string @alias(\"key with space\")\n  // key4 Yeet //unaliased\n  key5 string @alias(\"key.with.punctuation/123\")\n\n}\n\nclass SubType {\n  fieldA string\n  @@description(#\"\n    yurt\n  \"#)\n}\n\nclass Yoink {\n  hrm SubEnum\n}\n\n\n\nenum SubEnum {\n  Yeet @description(\"ye\")\n  Foo \n  Bar\n\n  @@description(#\"\n    ye\n  \"#)\n}\n\n\nfunction FnTestClassAlias(input: string) -> TestClassAlias {\n  client GPT35\n  prompt #\"\n    {{ctx.output_format}}\n  \"#\n}\n\ntest FnTestClassAlias {\n  functions [FnTestClassAlias]\n  args {\n    input \"example input\"\n  }\n}\n",
        "test-files/aliases/enums.baml" => "enum TestEnum {\n  A @alias(\"k1\") @description(#\"\n    User is angry\n  \"#)\n  B @alias(\"k22\") @description(#\"\n    User is happy\n  \"#)\n  // tests whether k1 doesnt incorrectly get matched with k11\n  C @alias(\"k11\") @description(#\"\n    User is sad\n  \"#)\n  D @alias(\"k44\") @description(#\"\n    User is confused\n  \"#)\n  E @description(#\"\n    User is excited\n  \"#)\n  F @alias(\"k5\") // only alias\n  \n  G @alias(\"k6\") @description(#\"\n    User is bored\n    With a long description\n  \"#)\n   \n  @@alias(\"Category\")\n\n}\n\nfunction FnTestAliasedEnumOutput(input: string) -> TestEnum {\n  client GPT35\n  prompt #\"\n    Classify the user input into the following category\n      \n    {{ ctx.output_format }}\n\n    {{ _.role('user') }}\n    {{input}}\n\n    {{ _.role('assistant') }}\n    Category ID:\n  \"#\n}\n\ntest FnTestAliasedEnumOutput {\n  functions [FnTestAliasedEnumOutput]\n  args {\n    input \"mehhhhh\"\n  }\n}",
    }
  end
end