import {
  Block,
  CodeBlock,
  Line,
  parse,
  Table,
  Title,
} from "@progfay/scrapbox-parser";

const isTitle = (v: Block): v is Title => {
  return v.type === "title";
};

const isLine = (v: Block): v is Line => {
  return v.type === "line";
};

const isTable = (v: Block): v is Table => {
  return v.type === "table";
};

const isCodeBlock = (v: Block): v is CodeBlock => {
  return v.type === "codeBlock";
};

const nodeTypeMap = {
  type: {
    quote: {},
    helpfeel: {},
    strongImage: {},
    strongIcon: {},
    strong: {},
    formula: {},
    decoration: {},
    code: {}, // `text`
    commandLine: {}, // $ command
    blank: {},
    image: {},
    link: {},
    googleMap: {},
    icon: {},
    hashTag: {},
    numberList: {},
    plain: {},
  },
};

export const main = (scrapboxAPIText: string): string => {
  //   console.log(parse(scrapboxAPIText, {}));
  return parse(scrapboxAPIText, {})
    .map((v) => {
      if (isTitle(v)) {
        return v.text && `# ${v.text}`;
      } else if (isLine(v)) {
        let ignoreIndent = false;
        const l = v.nodes
          .map((n) => {
            switch (n.type) {
              case "quote":
                ignoreIndent = true;
                return `${n.raw}`;
              case "helpfeel":
                break;
              case "strongImage":
                break;
              case "strongIcon":
                break;
              case "strong":
                break;
              case "formula":
                break;
              case "decoration":
                break;
              case "code": // `text`
                return n.raw;
              case "commandLine": // $ command
                return `\`${n.raw}\``;
              case "blank":
                break;
              case "image":
                break;
              case "link":
                break;
              case "googleMap":
                break;
              case "icon":
                break;
              case "hashTag":
                break;
              case "numberList":
                break;
              case "plain":
                return n.raw;
              default:
                break;
            }
          })
          .join("");
        if (ignoreIndent || v.indent === 0) {
          return `${l}`;
        } else {
          return `${"  ".repeat(v.indent - 1) + "- " + l}`;
        }
      } else if (isCodeBlock(v)) {
        return `${v.fileName}`;
      } else if (isTable(v)) {
        return `${v.fileName}`;
      } else {
        console.log(`Unknown type: ${v}`);
      }
    })
    .join("\n");
};

// const PROJECT_NAME = "yux3";
// const PAGE_NAME = "markdown?????????";
// const res = fetch(
//   `https://scrapbox.io/api/pages/${PROJECT_NAME}/${PAGE_NAME}/text`
//   // https://scrapbox.io/api/pages/yux3/markdown%E3%83%86%E3%82%B9%E3%83%88/text
// )
//   .then((response) => response.text())
//   .then((text) => console.log(main(text)));
