import { screen } from "@testing-library/react";
import Card from ".";
import { withBrowserRouterRender } from "testUtils";

describe("cardComponent", () => {
    it("should render card withOut image", () => {
        withBrowserRouterRender(
            <Card url={""} title="Rick" description="Human" info="Bastard" id={3} type={"cardHref"} />
        );
        expect(screen.getByTestId("Card-3")).toHaveTextContent("Rick");
        expect(screen.getByTestId("Card-3")).toHaveTextContent("Human");
        expect(screen.getByTestId("Card-3")).toHaveTextContent("Bastard");
        expect(screen.getByTestId("Card-3")).not.toHaveTextContent("111");
        expect(screen.getByTestId("Card-3")).toMatchSnapshot();
    });
    it("should render card with image", () => {
        withBrowserRouterRender(
            <Card
                url={""}
                title="Rick"
                description="Human"
                id={3}
                image="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
                type={"cardHref"}
            />
        );
        expect(screen.getByTestId("Card-3")).toHaveTextContent("Rick");
        expect(screen.getByTestId("Card-3")).toHaveTextContent("Human");
        expect(screen.getByRole("img")).toBeDefined();
        expect(screen.getByTestId("Card-3")).not.toHaveTextContent("Bastard");
        expect(screen.getByTestId("Card-3")).not.toHaveTextContent("111");
        expect(screen.getByTestId("Card-3")).toMatchSnapshot();
    });
});
