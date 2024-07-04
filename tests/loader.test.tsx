import { render, screen } from "@testing-library/react";
import Loader from "../src/components/loader/loader";
import { expect,describe,test } from "vitest";

describe("Loader Component", () => {

    test("renders loader", () => {
        render(
            <Loader />
        );

        const loaderElement = screen.getByTestId("loader");
        expect(loaderElement).toBeTruthy();
    });

});

