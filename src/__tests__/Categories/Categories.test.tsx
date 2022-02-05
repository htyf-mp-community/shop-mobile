import React from "react";
import "@testing-library/jest-native/extend-expect";
import { act, fireEvent, render } from "@testing-library/react-native";
import Categories from "../../modules/Categories";

jest.mock("../../modules/Categories", () => () => "Categories");

describe("Categories", () => {
  test("It renders items", async () => {});
});
