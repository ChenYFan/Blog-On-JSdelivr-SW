import { FromSchema } from "json-schema-to-ts";

export const configSchema = {
  $schema: "http://json-schema.org/draft-06/schema#",
  $ref: "#/definitions/ClientWorker",
  definitions: {
    ClientWorker: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
        },
        hotpatch: {
          type: "array",
          items: {
            type: "string",
            format: "uri",
            "qt-uri-protocols": ["https"],
            "qt-uri-extensions": [".js"],
          },
        },
        hotconfig: {
          type: "array",
          items: {
            type: "string",
            format: "uri",
            "qt-uri-protocols": ["https"],
            "qt-uri-extensions": [".yaml"],
          },
        },
        cleaninterval: {
          type: "string",
        },
        catch_rules: {
          type: "array",
          items: {
            $ref: "#/definitions/CatchRule",
          },
        },
      },
      required: ["catch_rules", "name"],
      title: "Clientworker",
    },
    CatchRule: {
      type: "object",
      additionalProperties: false,
      properties: {
        rule: {
          type: "string",
        },
        transform_rules: {
          type: "array",
          items: {
            $ref: "#/definitions/TransformRule",
          },
        },
      },
      required: ["rule", "transform_rules"],
      title: "CatchRule",
    },
    TransformRule: {
      type: "object",
      additionalProperties: false,
      properties: {
        search: {
          type: "string",
        },
        searchin: {
          type: "string",
        },
        replace: {
          $ref: "#/definitions/Replace",
        },
        action: {
          type: "string",
          enum: ["redirect", "return", "fetch", "script", "skip"],
        },
        redirect: {
          $ref: "#/definitions/Redirect",
        },
        script: {
          $ref: "#/definitions/Script",
        },
        fetch: {
          $ref: "#/definitions/Fetch",
        },
        header: {
          $ref: "#/definitions/Header",
        },
        searchkey: {
          type: "string",
        },
        replacein: {
          type: "string",
        },
        replacekey: {
          type: "string",
        },
        searchflags: {
          type: "string",
        },
        replaceflags: {
          type: "string",
        },
        return: {
          $ref: "#/definitions/Return",
        },
      },
      required: ["search"],
      title: "TransformRule",
    },
    Fetch: {
      type: "object",
      additionalProperties: false,
      properties: {
        status: {
          type: "integer",
        },
        engine: {
          type: "string",
          enum: ["fetch", "crazy", "classic", "parallel", "KFCThursdayVW50"],
        },
        preflight: {
          type: "boolean",
        },
        credentials: {
          type: "string",
          enum: ["same-origin", "include", "omit"],
        },
        trylimit: { type: "number" },
        redirect: { type: "string", enum: ["error", "follow", "manual"] },
        mode: {
          type: "string",
          enum: ["same-origin", "cors", "navigate", "no-cors"],
        },
        timeout: {
          type: "integer",
        },
        cache: {
          $ref: "#/definitions/Cache",
        },
        threads: {
          type: "integer",
        },
        enable: {
          type: "boolean",
        },
      },
      required: ["engine", "preflight"],
      title: "Fetch",
    },
    Cache: {
      type: "object",
      additionalProperties: false,
      properties: {
        expire: {
          type: "string",
        },
        delay: {
          type: "integer",
        },
        enable: {
          type: "boolean",
        },
      },
      required: ["expire"],
      title: "Cache",
    },
    Header: {
      type: "object",
      additionalProperties: false,
      properties: {
        "content-type": {
          type: "string",
        },
        ServerProvide: {
          type: "string",
        },
      },
      required: ["ServerProvide", "content-type"],
      title: "Header",
    },
    Redirect: {
      description:
        "你要找的是在外部观察 url 不跳转的 URL 重写吗？redirect 可以直接返回一个跳转，无视 fetch 状态，对接下来的规则也将不执行。",
      type: "object",
      additionalProperties: false,
      properties: {
        to: {
          description: "表示重定向的替换规则",
          type: "string",
        },
        url: {
          description: "表示重定向的目标url",
          type: "string",
          format: "uri",
          "qt-uri-protocols": ["https"],
        },
        status: {
          description: "你可以选择 301/302，不过这其实没有太大用处。",
          type: "integer",
        },
      },
      required: [],
      title: "Redirect",
    },
    Return: {
      type: "object",
      additionalProperties: false,
      properties: {
        body: {
          type: "string",
        },
        header: {
          $ref: "#/definitions/Header",
        },
        status: {
          type: "integer",
        },
      },
      required: ["body", "header", "status"],
      title: "Return",
    },
    Script: {
      type: "object",
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
        },
        skip: {
          type: "boolean",
        },
        function: {
          type: "string",
        },
      },
      required: ["skip"],
      title: "Script",
    },
    Replace: {
      anyOf: [
        {
          type: "array",
          items: {
            type: "string",
            format: "uri",
            "qt-uri-protocols": ["https"],
          },
        },
        {
          type: "string",
        },
      ],
      title: "Replace",
    },
  },
} as const;

export type ConfigType = FromSchema<typeof configSchema>;
