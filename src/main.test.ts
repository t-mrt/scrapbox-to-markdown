import { main } from "./main";

describe("test", () => {
  it("indent", () => {
    const text = `
test
 test
  test
   test
\ttest
\t\ttest
`;
    expect(main(text)).toMatchSnapshot();
  });

  it("title", () => {
    const text = `title-name
body1
body2
`;
    expect(main(text)).toMatchSnapshot();
  });

  it("code", () => {
    const text = `
plain\`code\`plain2
`;
    expect(main(text)).toMatchSnapshot();
  });

  it("code", () => {
    const text = `
$ commandLine
`;
    expect(main(text)).toMatchSnapshot();
  });
});
