import { render, screen } from "@testing-library/react";
import StreamPlaceholder from "../src/components/videoPlayer/placeholderStream";
import { expect,describe,test} from "vitest";

declare module "react" {
    interface JSX {
        IntrinsicElements: any;
    }
}
  

describe("placeholderStream Component", () => {
        
                test("renders placeholderStream", () => {
                        render(
                            <StreamPlaceholder
                            width={1}
                            height={1}
                            url={"url"}
                        />
            );
    
            const placeholderStreamElement = screen.getByTestId("placeholderStream");
            expect(placeholderStreamElement).toBeTruthy();
        });
    
    });