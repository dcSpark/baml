/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/

// This file was generated by BAML: do not edit it. Instead, edit the BAML
// files and re-generate this code.
//
// tslint:disable
// @ts-nocheck
// biome-ignore format: autogenerated code
/* eslint-disable */
const fileMap = {
  
  "test-files/functions/input/named-args/single/named-class.baml": "class NamedArgsSingleClass {\n  key string\n  key_two bool\n  key_three int\n  // TODO: doesn't work with keys with numbers\n  // key2 bool\n  // key3 int\n}\n\nfunction TestFnNamedArgsSingleClass(myArg: NamedArgsSingleClass) -> string {\n  client GPT35\n  prompt #\"\n    Print these values back to me:\n    {{myArg.key}}\n    {{myArg.key_two}}\n    {{myArg.key_three}}\n  \"#\n}\n\ntest TestFnNamedArgsSingleClass {\n  functions [TestFnNamedArgsSingleClass]\n  args {\n    myArg {\n      key \"example\",\n      key_two true,\n      key_three 42\n    }\n  }\n}\n\nfunction TestMulticlassNamedArgs(myArg: NamedArgsSingleClass, myArg2: NamedArgsSingleClass) -> string {\n  client GPT35\n  prompt #\"\n    Print these values back to me:\n    {{myArg.key}}\n    {{myArg.key_two}}\n    {{myArg.key_three}}\n    {{myArg2.key}}\n    {{myArg2.key_two}}\n    {{myArg2.key_three}}\n  \"#\n}",
  "test-files/functions/v2/basic.baml": "\n\nfunction ExtractResume2(resume: string) -> Resume {\n    client Resilient_ComplexSyntax\n    prompt #\"\n        {{ _.chat('system') }}\n\n        Extract the following information from the resume:\n\n        Resume:\n        <<<<\n        {{ resume }}\n        <<<<\n\n        Output JSON schema:\n        {{ ctx.output_format }}\n\n        JSON:\n    \"#\n}\n\n\nclass WithReasoning {\n    value string\n    reasoning string @description(#\"\n        Why the value is a good fit.\n    \"#)\n}\n\n\nclass SearchParams {\n    dateRange int? @description(#\"\n        In ISO duration format, e.g. P1Y2M10D.\n    \"#)\n    location string[]\n    jobTitle WithReasoning? @description(#\"\n        An exact job title, not a general category.\n    \"#)\n    company WithReasoning? @description(#\"\n        The exact name of the company, not a product or service.\n    \"#)\n    description WithReasoning[] @description(#\"\n        Any specific projects or features the user is looking for.\n    \"#)\n    tags (Tag | string)[]\n}\n\nenum Tag {\n    Security\n    AI\n    Blockchain\n}\n\nfunction GetQuery(query: string) -> SearchParams {\n    client GPT4\n    prompt #\"\n        Extract the following information from the query:\n\n        Query:\n        <<<<\n        {{ query }}\n        <<<<\n\n        OUTPUT_JSON_SCHEMA:\n        {{ ctx.output_format }}\n\n        Before OUTPUT_JSON_SCHEMA, list 5 intentions the user may have.\n        --- EXAMPLES ---\n        1. <intent>\n        2. <intent>\n        3. <intent>\n        4. <intent>\n        5. <intent>\n\n        {\n            ... // OUTPUT_JSON_SCHEMA\n        }\n    \"#\n}\n\nclass RaysData {\n    dataType DataType\n    value Resume | Event\n}\n\nenum DataType {\n    Resume\n    Event\n}\n\nclass Event {\n    title string\n    date string\n    location string\n    description string\n}\n\nfunction GetDataType(text: string) -> RaysData {\n    client GPT4\n    prompt #\"\n        Extract the relevant info.\n\n        Text:\n        <<<<\n        {{ text }}\n        <<<<\n\n        Output JSON schema:\n        {{ ctx.output_format }}\n\n        JSON:\n    \"#\n}\n",
  "test-files/functions/prompts/no-chat-messages.baml": "\n\nfunction PromptTestClaude(input: string) -> string {\n  client Claude\n  prompt #\"\n    Tell me a haiku about {{ input }}\n  \"#\n}\n\nfunction PromptTestOpenAI(input: string) -> string {\n  client GPT35\n  prompt #\"\n    Tell me a haiku about {{ input }}\n  \"#\n}",
  "test-files/comments/comments.baml": "// add some functions, classes, enums etc with comments all over.",
  "test-files/providers/providers.baml": "\n\nfunction TestOllama(input: string) -> string {\n  client Ollama\n  prompt #\"\n    Write a nice haiku about {{ input }}\n  \"#\n}\n\ntest TestProvider {\n  functions [TestOllama]\n  args {\n    input \"the moon\"\n  }\n}",
  "test-files/functions/input/named-args/syntax.baml": "function TestFnNamedArgsSyntax {\n  input (myVar: string,  var_with_underscores: string)\n  output string\n}\n// TODO: we don't support numbers in named args yet!\n// TODO: we also allow dashes but python fails.",
  "fiddle-examples/classify-message.baml": "// This will be available as an enum in your Python and Typescript code.\nenum Category {\n    Refund\n    CancelOrder\n    TechnicalSupport\n    AccountIssue\n    Question\n}\n\nfunction ClassifyMessage(input: string) -> Category {\n  client GPT4\n\n  prompt #\"\n    Classify the following INPUT into ONE\n    of the following categories:\n\n    INPUT: {{ input }}\n\n    {{ ctx.output_format }}\n\n    Response:\n  \"#\n}",
  "test-files/aliases/enums.baml": "enum TestEnum {\n  A @alias(\"k1\") @description(#\"\n    User is angry\n  \"#)\n  B @alias(\"k22\") @description(#\"\n    User is happy\n  \"#)\n  // tests whether k1 doesnt incorrectly get matched with k11\n  C @alias(\"k11\") @description(#\"\n    User is sad\n  \"#)\n  D @alias(\"k44\") @description(\n    User is confused\n  )\n  E @description(\n    User is excited\n  )\n  F @alias(\"k5\") // only alias\n  \n  G @alias(\"k6\") @description(#\"\n    User is bored\n    With a long description\n  \"#)\n   \n  @@alias(\"Category\")\n}\n\nfunction FnTestAliasedEnumOutput(input: string) -> TestEnum {\n  client GPT35\n  prompt #\"\n    Classify the user input into the following category\n      \n    {{ctx.output_format}}\n    ---\n\n    input: {{input}}\n\n    Category ID:\n  \"#\n}\n\ntest FnTestAliasedEnumOutput {\n  functions [FnTestAliasedEnumOutput]\n  args {\n    input \"mehhhhh\"\n  }\n}",
  "fiddle-examples/images/image.baml": "function DescribeImage(img: image) -> string {\n  client GPT4Turbo\n  prompt #\"\n    {{ _.chat(role=\"user\") }}\n\n\n    Describe the image below in 5 words:\n    {{ img }}\n  \"#\n\n}\n\nclass FakeImage {\n  url string\n}\n\nclass ClassWithImage {\n  myImage image\n  param2 string\n  fake_image FakeImage\n}\n\n// chat role user present\nfunction DescribeImage2(classWithImage: ClassWithImage, img2: image) -> string {\n  client GPT4Turbo\n  prompt #\"\n    {{ _.chat(role=\"user\") }}\n    You should return 2 answers that answer the following commands.\n\n    1. Describe this in 5 words:\n    {{ classWithImage.myImage }}\n\n    2. Also tell me what's happening here in one sentence:\n    {{ img2 }}\n  \"#\n}\n\n// no chat role\nfunction DescribeImage3(classWithImage: ClassWithImage, img2: image) -> string {\n  client GPT4Turbo\n  prompt #\"\n    Describe this in 5 words:\n    {{ classWithImage.myImage }}\n\n    Tell me also what's happening here in one sentence and relate it to the word {{ classWithImage.param2 }}:\n    {{ img2 }}\n  \"#\n}\n\n\n// system prompt and chat prompt\nfunction DescribeImage4(classWithImage: ClassWithImage, img2: image) -> string {\n  client GPT4Turbo\n  prompt #\"\n    {{ _.chat(role=\"system\")}}\n\n    Describe this in 5 words:\n    {{ classWithImage.myImage }}\n\n    Tell me also what's happening here in one sentence and relate it to the word {{ classWithImage.param2 }}:\n    {{ img2 }}\n  \"#\n}",
  "test-files/aliases/classes.baml": "class TestClassAlias {\n  key string @alias(\"key-dash\")\n  key2 string @alias(\"key21\")\n  key3 string @alias(\"key with space\")\n  key4 string //unaliased\n  key5 string @alias(\"key.with.punctuation/123\")\n}\n\nfunction FnTestClassAlias(input: string) -> TestClassAlias {\n  client GPT35\n  prompt #\"\n    Return a json blob that has this schema:\n    {{ctx.output_format}}\n\n    JSON:\n  \"#\n}\n\ntest FnTestClassAlias {\n  functions [FnTestClassAlias]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/functions/input/named-args/single/named-string.baml": "// test string\nfunction TestFnNamedArgsSingleString(myString: string) -> string {\n  client GPT35\n  prompt #\"\n    Return this value back to me: {{myString}}\n  \"#\n}\n\ntest TestFnNamedArgsSingleString {\n  functions [TestFnNamedArgsSingleString]\n  args {\n    myString \"example string\"\n  }\n}\n",
  "test-files/functions/output/string-list.baml": "function FnOutputStringList(input: string) -> string[] {\n  client GPT35\n  prompt #\"\n    Return a list of strings in json format like [\"string1\", \"string2\", \"string3\"].\n\n    JSON:\n  \"#\n}\n\ntest FnOutputStringList {\n  functions [FnOutputStringList]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/functions/prompts/with-chat-messages.baml": "\nfunction PromptTestOpenAIChat(input: string) -> string {\n  client GPT35\n  prompt #\"\n    {{ _.role(\"system\") }}\n    You are an assistant that always responds in a very excited way with emojis and also outputs this word 4 times after giving a response: {{ input }}\n    \n    {{ _.role(\"user\") }}\n    Tell me a haiku about {{ input }}\n  \"#\n}\n\nfunction PromptTestOpenAIChatNoSystem(input: string) -> string {\n  client GPT35\n  prompt #\"\n    You are an assistant that always responds in a very excited way with emojis and also outputs this word 4 times after giving a response: {{ input }}\n    \n    {{ _.role(\"user\") }}\n    Tell me a haiku about {{ input }}\n  \"#\n}\n\nfunction PromptTestClaudeChat(input: string) -> string {\n  client Claude\n  prompt #\"\n    {{ _.role(\"system\") }}\n    You are an assistant that always responds in a very excited way with emojis and also outputs this word 4 times after giving a response: {{ input }}\n    \n    {{ _.role(\"user\") }}\n    Tell me a haiku about {{ input }}\n  \"#\n}\n\nfunction PromptTestClaudeChatNoSystem(input: string) -> string {\n  client Claude\n  prompt #\"\n    You are an assistant that always responds in a very excited way with emojis and also outputs this word 4 times after giving a response: {{ input }}\n    \n    {{ _.role(\"user\") }}\n    Tell me a haiku about {{ input }}\n  \"#\n}\n\ntest PromptTestOpenAIChat {\n  functions [PromptTestClaude, PromptTestOpenAI, PromptTestOpenAIChat, PromptTestOpenAIChatNoSystem, PromptTestClaudeChat, PromptTestClaudeChatNoSystem]\n  args {\n    input \"cats\"\n  }\n}\n\ntest TestClaude {\n  functions [PromptTestClaudeChatNoSystem]\n  args {\n    input \"lion\"\n  }\n}",
  "test-files/functions/output/unions.baml": "class UnionTest_ReturnType {\n  prop1 string | bool\n  prop2 (float | bool)[]\n  prop3 (float[] | bool[])\n}\n\nfunction UnionTest_Function(input: string | bool) -> UnionTest_ReturnType {\n  client GPT35\n  prompt #\"\n    Return a JSON blob with this schema: \n    {{ctx.output_format}}\n\n    JSON:\n  \"#\n}\n\ntest UnionTest_Function {\n  functions [UnionTest_Function]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/functions/input/named-args/single/named-image.baml": "function TestImageInput(img: image) -> string{\n  client GPT4o\n  prompt #\"\n    {{ _.role(\"user\") }}\n\n    Describe this in 4 words {{img}}\n  \"#\n}\n\ntest  TestImageInput {\n  functions [TestImageInput]\n  args {\n    img {\n      url \"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png\"\n    }\n  }\n}\n\n// double check this before adding it. Probably n ot right.\n// function TestImageInputAnthropic(img: image) -> string{\n//   client GPT4o\n//   prompt #\"\n//     {{ _.role(\"user\") }}\n\n//     Describe this in 4 words {{img}}\n//   \"#\n// }\n\n// test  TestImageInputAnthropic {\n//   functions [TestImageInputAnthropic]\n//   args {\n//     img {\n//       base64 iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=\n//       media_type \"png\"\n//     }\n//   }\n// }",
  "test-files/functions/input/named-args/single/named-string-list.baml": "// string[]\nfunction TestFnNamedArgsSingleStringArray(myStringArray: string[]) -> string {\n  client GPT35\n  prompt #\"\n    Return this value back to me: {{myStringArray}}\n  \"#\n}\n\ntest TestFnNamedArgsSingleStringArray {\n  functions [TestFnNamedArgsSingleStringArray]\n  args {\n    myStringArray [\"example1\", \"example2\", \"example3\"]\n  }\n}\n",
  "main.baml": "generator lang_python {\n  output_type python/pydantic\n  output_dir \"../python\"\n}\n\ngenerator lang_typescript {\n  output_type typescript\n  output_dir \"../typescript\"\n}\n ",
  "clients.baml": "retry_policy Bar {\n  max_retries 3\n  strategy {\n    type exponential_backoff\n  }\n}\n\nretry_policy Foo {\n  max_retries 3\n  strategy {\n    type constant_delay\n    delay_ms 100\n  }\n}\n\nclient<llm> GPT4 {\n  provider baml-openai-chat\n  options {\n    model gpt-4\n    api_key env.OPENAI_API_KEY\n  }\n} \n\n\nclient<llm> GPT4o {\n  provider baml-openai-chat\n  options {\n    model gpt-4o\n    api_key env.OPENAI_API_KEY\n  }\n} \n\n\nclient<llm> GPT4Turbo {\n  retry_policy Bar\n  provider baml-openai-chat\n  options {\n    model gpt-4-turbo\n    api_key env.OPENAI_API_KEY\n  }\n} \n\nclient<llm> GPT35 {\n  provider baml-openai-chat\n  options {\n    model \"gpt-3.5-turbo\"\n    api_key env.OPENAI_API_KEY\n  }\n}\n\nclient<llm> Ollama {\n  provider ollama\n  options {\n    model llama2\n    api_key \"\"\n  }\n}\n\nclient<llm> GPT35Azure {\n  provider azure-openai\n  options {\n    resource_name \"west-us-azure-baml\"\n    deployment_id \"gpt-35-turbo-default\"\n    // base_url \"https://west-us-azure-baml.openai.azure.com/openai/deployments/gpt-35-turbo-default\"\n    api_version \"2024-02-01\"\n    api_key env.AZURE_OPENAI_API_KEY\n  }\n}\n\n\nclient<llm> Claude {\n  provider baml-anthropic-chat\n  options {\n    model claude-3-haiku-20240307\n    api_key env.ANTHROPIC_API_KEY\n    max_tokens 1000\n  }\n}\n\nclient<llm> Resilient_SimpleSyntax {\n  retry_policy Foo\n  provider baml-fallback\n  options {\n    strategy [\n      GPT4Turbo\n      GPT35\n      Lottery_SimpleSyntax\n    ]\n  }\n} \n\nclient<llm> Resilient_ComplexSyntax {\n  provider baml-fallback\n  options {\n    strategy [\n      {\n        client GPT4Turbo\n      }\n      {\n        client GPT35\n      }\n      {\n        client Claude\n      }\n    ]\n  }\n}\n \nclient<llm> Lottery_SimpleSyntax {\n  provider baml-round-robin\n  options {\n    start 0\n    strategy [\n      GPT35\n      Claude\n    ]\n  }\n}\n\nclient<llm> Lottery_ComplexSyntax {\n  provider baml-round-robin\n  options {\n    start 0\n    strategy [\n      {\n        client GPT35\n      }\n      {\n        client Claude\n      }\n    ] \n  }\n}",
  "test-files/functions/output/enum.baml": "enum EnumOutput {\n  ONE\n  TWO\n  THREE\n\n  @@alias(\"VALUE_ENUM\")\n}\n\nfunction FnEnumOutput(input: string) -> EnumOutput {\n  client GPT35\n  prompt #\"\n    Choose one of these values randomly. Before you give the answer, write out an unrelated haiku about the ocean.\n\n    {{ctx.output_format}}\n  \"#\n}\n\ntest FnEnumOutput {\n  functions [FnEnumOutput]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/functions/output/optional-class.baml": "class ClassOptionalOutput {\n  prop1 string\n  prop2 string\n}\n\nfunction FnClassOptionalOutput(input: string) -> ClassOptionalOutput? {\n  client GPT35\n  prompt #\"\n    Return a json blob for the following input:\n    {{input}}\n\n    {{ctx.output_format}}\n\n    JSON:\n  \"#\n}\n\n\nclass Blah {\n  prop4 string?\n}\n\nclass ClassOptionalOutput2 {\n  prop1 string?\n  prop2 string?\n  prop3 Blah?\n}\n\nfunction FnClassOptionalOutput2(input: string) -> ClassOptionalOutput2? {\n  client GPT35\n  prompt #\"\n    Return a json blob for the following input:\n    {{input}}\n\n    {{ctx.output_format}}\n\n    JSON:\n  \"#\n}\n\ntest FnClassOptionalOutput2 {\n  functions [FnClassOptionalOutput2, FnClassOptionalOutput]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/functions/input/named-args/single/named-int.baml": "// test for int\nfunction TestFnNamedArgsSingleInt(myInt: int) -> string {\n  client GPT35\n  prompt #\"\n    Return this value back to me: {{myInt}}\n  \"#\n}\n\ntest TestFnNamedArgsSingleInt {\n  functions [TestFnNamedArgsSingleInt]\n  args {\n    myInt 42\n  }\n}\n",
  "test-files/functions/output/enum-list.baml": "function FnEnumListOutput(input: string) -> EnumOutput[] {\n  client GPT35\n  prompt #\"\n    Print out two of these values randomly selected from the list below in a json array.\n\n    {{ctx.output_format}}\n\n    Answer:\n  \"#\n}\n\ntest FnEnumListOutput {\n  functions [FnEnumListOutput]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/functions/output/boolean.baml": "function FnOutputBool(input: string) -> bool {\n  client GPT35\n  prompt #\"\n    Return a {{ ctx.output_format}}:\n  \"#\n}\n\ntest FnOutputBool {\n  functions [FnOutputBool]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/functions/input/named-args/single/named-class-list.baml": "\n\n\nfunction TestFnNamedArgsSingleStringList(myArg: string[]) -> string{\n  client GPT35\n  prompt #\"\n    Return this value back to me: {{myArg}}\n  \"#\n}\n\ntest TestFnNamedArgsSingleStringList {\n  functions [TestFnNamedArgsSingleStringList]\n  args {\n    myArg [\"hello\", \"world\"]\n  }\n}",
  "test-files/functions/output/class-with-enum.baml": "enum EnumInClass {\n  ONE\n  TWO\n}\n\nclass TestClassWithEnum {\n  prop1 string\n  prop2 EnumInClass\n}\n\nfunction FnOutputClassWithEnum(input: string) -> TestClassWithEnum {\n  client GPT35\n  prompt #\"\n    Return a made up json blob that matches this schema:\n    {{ctx.output_format}}\n    ---\n\n    JSON:\n  \"#\n}\n\ntest FnOutputClassWithEnum {\n  functions [FnOutputClassWithEnum]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/testing_pipeline/resume.baml": "class Resume {\n    name string\n    email string\n    phone string\n    experience Education[]\n    education string[]\n    skills string[]\n}\n\nclass Education {\n    institution string\n    location string\n    degree string\n    major string[]\n    graduation_date string?\n}\n\ntemplate_string AddRole(foo: string) #\"\n    {{ _.chat('system')}}\n    You are a {{ foo }}. be nice\n\n    {{ _.chat('user') }}\n\"#\n\nfunction ExtractResume(resume: string, img: image) -> Resume {\n    client GPT4\n    prompt #\"\n        {{ AddRole(\"Software Engineer\") }}\n\n        Extract data:\n\n        <<<<\n        {{ resume }}\n        <<<<\n\n        {% if img %}\n        {{img}}\n        {% endif %}\n\n        {{ ctx.output_format }}\n    \"#\n}\n\ntest sam_resume {\n    functions [ExtractResume]\n    input {\n        img {\n            url \"https://avatars.githubusercontent.com/u/1016595?v=4\"\n        }\n        resume #\"\n            Sam Lijin\n            he/him |  jobs@sxlijin.com |  sxlijin.github.io |  sxlijin |  sxlijin\n\n            Experience\n            Trunk\n            | July 2021 - current\n            Trunk Check | Senior Software Engineer | Services TL, Mar 2023 - current | IC, July 2021 - Feb 2023\n            Proposed, designed, and led a team of 3 to build a web experience for Check (both a web-only onboarding flow and SaaS offerings)\n            Proposed and built vulnerability scanning into Check, enabling it to compete with security products such as Snyk\n            Helped grow Check from <1K users to 90K+ users by focusing on product-led growth\n            Google | Sept 2017 - June 2021\n            User Identity SRE | Senior Software Engineer | IC, Mar 2021 - June 2021\n            Designed an incremental key rotation system to limit the global outage risk to Google SSO\n            Discovered and severed an undocumented Gmail serving dependency on Identity-internal systems\n            Cloud Firestore | Senior Software Engineer | EngProd TL, Aug 2019 - Feb 2021 | IC, Sept 2017 - July 2019\n            Metadata TTL system: backlog of XX trillion records, sustained 1M ops/sec, peaking at 3M ops/sec\n\n            Designed and implemented a logging system with novel observability and privacy requirements\n            Designed and implemented Jepsen-style testing to validate correctness guarantees\n            Datastore Migration: zero downtime, xM RPS and xxPB of data over xM customers and 36 datacenters\n\n            Designed composite index migration, queue processing migration, progressive rollout, fast rollback, and disk stockout mitigations; implemented transaction log replay, state transitions, and dark launch process\n            Designed and implemented end-to-end correctness and performance testing\n            Velocity improvements for 60-eng org\n\n            Proposed and implemented automated rollbacks: got us out of a 3-month release freeze and prevented 5 outages over the next 6 months\n            Proposed and implemented new development and release environments spanning 30+ microservices\n            Incident response for API proxy rollback affecting every Google Cloud service\n\n            Google App Engine Memcache | Software Engineer | EngProd TL, Apr 2019 - July 2019\n            Proposed and led execution of test coverage improvement strategy for a new control plane: reduced rollbacks and ensured strong consistency of a distributed cache serving xxM QPS\n            Designed and implemented automated performance regression testing for two critical serving paths\n            Used to validate Google-wide rollout of AMD CPUs, by proving a 50p latency delta of <10µs\n            Implemented on shared Borg (i.e. vulnerable to noisy neighbors) with <12% variance\n            Miscellaneous | Sept 2017 - June 2021\n            Redesigned the Noogler training on Google-internal storage technologies & trained 2500+ Nooglers\n            Landed multiple google3-wide refactorings, each spanning xxK files (e.g. SWIG to CLIF)\n            Education\n            Vanderbilt University (Nashville, TN) | May 2017 | B.S. in Computer Science, Mathematics, and Political Science\n\n            Stuyvesant HS (New York, NY) | 2013\n\n            Skills\n            C++, Java, Typescript, Javascript, Python, Bash; light experience with Rust, Golang, Scheme\n            gRPC, Bazel, React, Linux\n            Hobbies: climbing, skiing, photography\n        \"#\n    }\n}\n\ntest vaibhav_resume {\n    functions [ExtractResume]\n    input {\n        resume #\"\n            Vaibhav Gupta\n            linkedin/vaigup\n            (972) 400-5279\n            vaibhavtheory@gmail.com\n            EXPERIENCE\n            Google,\n            Software Engineer\n            Dec 2018-Present\n            Seattle, WA\n            •\n            Augmented Reality,\n            Depth Team\n            •\n            Technical Lead for on-device optimizations\n            •\n            Optimized and designed front\n            facing depth algorithm\n            on Pixel 4\n            •\n            Focus: C++ and SIMD on custom silicon\n            \n            \n            EDUCATION\n            University of Texas at Austin\n            Aug 2012-May 2015\n            Bachelors of Engineering, Integrated Circuits\n            Bachelors of Computer Science\n        \"#\n    }\n}",
  "fiddle-examples/chat-roles.baml": "// This will be available as an enum in your Python and Typescript code.\nenum Category2 {\n    Refund\n    CancelOrder\n    TechnicalSupport\n    AccountIssue\n    Question\n}\n\nfunction ClassifyMessage2(input: string) -> Category {\n  client GPT4\n\n  prompt #\"\n    {{ _.chat(\"system\") }}\n    // You can use _.chat(\"system\") to indicate that this text should be a system message\n\n    Classify the following INPUT into ONE\n    of the following categories:\n\n    {{ ctx.output_format }}\n\n    {{ _.chat(\"user\") }}\n    // And _.chat(\"user\") to indicate that this text should be a user message\n\n    INPUT: {{ input }}\n\n    Response:\n  \"#\n}",
  "test-files/functions/input/named-args/single/named-enum-list.baml": "enum NamedArgsSingleEnumList {\n  ONE\n  TWO\n}\n\nfunction TestFnNamedArgsSingleEnumList(myArg: NamedArgsSingleEnumList[]) -> string {\n  client GPT35\n  prompt #\"\n    Print these values back to me:\n    {{myArg}}\n  \"#\n}\n\ntest TestFnNamedArgsSingleEnumList {\n  functions [TestFnNamedArgsSingleEnumList]\n  args {\n    myArg [ONE, TWO]\n  }\n}",
  "fiddle-examples/chain-of-thought.baml": "class Email {\n    subject string\n    body string\n    from_address string\n}\n\nenum OrderStatus {\n    ORDERED\n    SHIPPED\n    DELIVERED\n    CANCELLED\n}\n\nclass OrderInfo {\n    order_status OrderStatus\n    tracking_number string?\n    estimated_arrival_date string?\n}\n\nfunction GetOrderInfo(email: Email) -> OrderInfo {\n  client GPT4\n  prompt #\"\n    Given the email below:\n\n    ```\n    from: {{email.from_address}}\n    Email Subject: {{email.subject}}\n    Email Body: {{email.body}}\n    ```\n\n    Extract this info from the email in JSON format:\n    {{ ctx.output_format }}\n\n    Before you output the JSON, please explain your\n    reasoning step-by-step. Here is an example on how to do this:\n    'If we think step by step we can see that ...\n     therefore the output JSON is:\n    {\n      ... the json schema ...\n    }'\n  \"#\n}",
  "test-files/functions/output/class-list.baml": "function FnOutputClassList(input: string) -> TestOutputClass[] {\n  client GPT35\n  prompt #\"\n    Return a JSON array that follows this schema: \n    {{ctx.output_format}}\n\n    JSON:\n  \"#\n}\n\ntest FnOutputClassList {\n  functions [FnOutputClassList]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/functions/input/named-args/single/named-enum.baml": "enum NamedArgsSingleEnum {\n  ONE\n  TWO\n}\n\nfunction FnTestNamedArgsSingleEnum(myArg: NamedArgsSingleEnum) -> string {\n  client GPT35\n  prompt #\"\n    Print these values back to me:\n    {{myArg}}\n  \"#\n}\n\ntest FnTestNamedArgsSingleEnum {\n  functions [FnTestNamedArgsSingleEnum]\n  args {\n    myArg ONE\n  }\n}",
  "test-files/functions/input/named-args/single/named-string-optional.baml": "\n\n // string[]\nfunction FnNamedArgsSingleStringOptional(myString: string?) -> string {\n  client GPT35\n  prompt #\"\n    Return this value back to me: {{myString}}\n  \"#\n}\n\ntest FnNamedArgsSingleStringOptional {\n  functions [FnNamedArgsSingleStringOptional]\n  args {\n    myString \"example string\"\n  }\n}\n\ntest FnNamedArgsSingleStringOptional2 {\n  functions [FnNamedArgsSingleStringOptional]\n  args {\n    \n  }\n}\n",
  "test-files/functions/output/optional.baml": "class OptionalTest_Prop1 {\n  omega_a string\n  omega_b int\n}\n\nenum OptionalTest_CategoryType {\n  Aleph\n  Beta\n  Gamma\n}\n\nclass OptionalTest_ReturnType {\n  omega_1 OptionalTest_Prop1?\n  omega_2 string?\n  omega_3 (OptionalTest_CategoryType?)[]\n}\n\nfunction OptionalTest_Function(input: string) -> (OptionalTest_ReturnType?)[]\n{\n  client GPT35\n  prompt #\"\n    Return a JSON blob with this schema: \n    {{ctx.output_format}}\n\n    JSON:\n  \"#\n}\n\ntest OptionalTest_Function {\n  functions [OptionalTest_Function]\n  args {\n    input \"example input\"\n  }\n}\n",
  "test-files/functions/output/class.baml": "class TestOutputClass {\n  prop1 string\n  prop2 int\n}\n\nfunction FnOutputClass(input: string) -> TestOutputClass {\n  client GPT35\n  prompt #\"\n    Return a JSON blob with this schema: \n    {{ctx.output_format}}\n\n    JSON:\n  \"#\n}\n\ntest TestClass {\n  functions [FnOutputClass, FnOutputNestedClass]\n  args {\n    input \"example input\"\n  }\n}\n\nclass TestOutputClassNested {\n  prop1 string\n  prop2 int\n  prop3 TestOutputClass\n}\n\nfunction FnOutputNestedClass(input: string) -> TestOutputClassNested {\n  client GPT35\n  prompt #\"\n    Return a JSON blob with this schema: \n    {{ctx.output_format}}\n\n    JSON:\n  \"#\n}",
  "test-files/functions/input/named-args/single/named-boolean.baml": "\n\nfunction TestFnNamedArgsSingleBool(myBool: bool) -> string{\n  client GPT35\n  prompt #\"\n    Return this value back to me: {{myBool}}\n  \"#\n}\n\ntest TestFnNamedArgsSingleBool {\n  functions [TestFnNamedArgsSingleBool]\n  args {\n    myBool true\n  }\n}",
  "test-files/functions/output/int.baml": "   ",
  "fiddle-examples/extract-names.baml": "function ExtractNames(input: string) -> string[] {\n  client GPT4\n  prompt #\"\n    Extract the names from this INPUT:\n  \n    INPUT:\n    ---\n    {{ input }}\n    ---\n\n    {{ ctx.output_format }}\n\n    Response:\n  \"#\n}\n",
  "test-files/functions/input/named-args/single/named-float.baml": "function TestFnNamedArgsSingleFloat(myFloat: float) -> string {\n  client GPT35\n  prompt #\"\n    Return this value back to me: {{myFloat}}\n  \"#\n}\n\ntest TestFnNamedArgsSingleFloat {\n  functions [TestFnNamedArgsSingleFloat]\n  args {\n    myFloat 3.14\n  }\n}\n",
  "fiddle-examples/symbol-tuning.baml": "enum Category3 {\n    Refund @alias(\"k1\")\n    @description(\"Customer wants to refund a product\")\n\n    CancelOrder @alias(\"k2\")\n    @description(\"Customer wants to cancel an order\")\n\n    TechnicalSupport @alias(\"k3\")\n    @description(\"Customer needs help with a technical issue unrelated to account creation or login\")\n\n    AccountIssue @alias(\"k4\")\n    @description(\"Specifically relates to account-login or account-creation\")\n\n    Question @alias(\"k5\")\n    @description(\"Customer has a question\")\n}\n\nfunction ClassifyMessage3(input: string) -> Category {\n  client GPT4\n\n  prompt #\"\n    Classify the following INPUT into ONE\n    of the following categories:\n\n    INPUT: {{ input }}\n\n    {{ ctx.output_format }}\n\n    Response:\n  \"#\n}",
}
export const getBamlFiles = () => {
    return fileMap;
}