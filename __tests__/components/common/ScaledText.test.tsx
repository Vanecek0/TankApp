import React from "react";
import { render } from "@testing-library/react-native";
import ScaledText from "@/components/common/ScaledText";
import { FontSizes } from "@/utils/fontScaling";
import getScaleFactor, { getDeviceType } from "@/utils/SizeScaling";

describe("<ScaledText />", () => {
  it("renders given text", async () => {
    const { findByText } = render(
      <ScaledText size="2xl">Testing the component</ScaledText>
    );
    await findByText("Testing the component");
  });
  it("applies correct font size and line height based on size prop", async () => {
    const { findByText } = render(
      <ScaledText size="2xl">Testing the component</ScaledText>
    );

    const text = await findByText("Testing the component");
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          fontSize: FontSizes["2xl"].size,
          lineHeight: FontSizes["2xl"].lineHeight * getScaleFactor(),
        }),
      ])
    );
  });
  it("multiplies line height by scale factor", async () => {
    const { findByText } = render(
      <ScaledText size="2xl">Testing the component</ScaledText>
    );

    const textElement = await findByText("Testing the component");
    const textStyle = Array.isArray(textElement.props.style)
      ? Object.assign({}, ...textElement.props.style)
      : textElement.props.style;

    expect(textStyle.lineHeight).toBe(FontSizes["2xl"].lineHeight * 2);
  });
  it(`renders correctly`, () => {
    const { toJSON } = render(
      <ScaledText size="2xl">Testing the component</ScaledText>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
