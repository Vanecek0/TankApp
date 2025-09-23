import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import CustomButton from "@/components/common/Buttons";

describe("<CustomButton />", () => {
  it("calling the OnPress function", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton
        label="Click"
        labelSize="base"
        onPress={onPressMock}
        backgroundColor="blue"
      ></CustomButton>
    );

    const buttonLabel = getByText("Click");
    expect(buttonLabel).toBeTruthy();

    fireEvent.press(buttonLabel);

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
