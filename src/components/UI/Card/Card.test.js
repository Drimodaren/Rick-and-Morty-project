import { screen } from "@testing-library/react";
import Card from ".";
import { withBrowserRouterRender } from "testUtils";

describe("cardComponent", () => {
    it("should render card withOut image", () => {
        withBrowserRouterRender(<Card url={""} title="Rick" description="Human" info="Bastard" id={2} />);
        expect(screen.getByTestId("Card-2")).toHaveTextContent("Rick");
        expect(screen.getByTestId("Card-2")).toHaveTextContent("Human");
        expect(screen.getByTestId("Card-2")).toHaveTextContent("Bastard");
        expect(screen.getByTestId("Card-2")).not.toHaveTextContent("111");
        expect(screen.getByTestId("Card-2")).toMatchSnapshot();
    });
    it("should render card with image", () => {
        withBrowserRouterRender(
            <Card
                url={""}
                title="Rick"
                description="Human"
                id={2}
                image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
            />
        );
        expect(screen.getByTestId("Card-2")).toHaveTextContent("Rick");
        expect(screen.getByTestId("Card-2")).toHaveTextContent("Human");
        expect(screen.getByRole("img")).toBeDefined();
        expect(screen.getByTestId("Card-2")).not.toHaveTextContent("Bastard");
        expect(screen.getByTestId("Card-2")).not.toHaveTextContent("111");
        expect(screen.getByTestId("Card-2")).toMatchSnapshot();
        //expect(screen.getByTestId("Card-2").querySelector('img')).toBeDefined();
    });
});
