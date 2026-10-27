import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { CustomPagination } from "./CustomPagination";
import { MemoryRouter } from "react-router";
import type { PropsWithChildren } from "react";

vi.mock('../ui/button', () => ({
    Button: ({ children, ...props }: PropsWithChildren) => (
        <button {...props}>{children}</button>
    ),
}));



const renderWithRouter = (component: React.ReactElement, initialEntries?: string[]) => {
    return render(
        <MemoryRouter
            initialEntries={initialEntries}>
            {component}
        </MemoryRouter>
    )
}

describe('CustomPagination', () => {

    test('should render component with default values', () => {
        renderWithRouter(<CustomPagination totalPages={5} />)
        expect(screen.getByText('Previous')).toBeDefined();
        expect(screen.getByText('1')).toBeDefined();
        expect(screen.getByText('2')).toBeDefined();
        expect(screen.getByText('3')).toBeDefined();
        expect(screen.getByText('4')).toBeDefined();
        expect(screen.getByText('5')).toBeDefined();
        expect(screen.getByText('Next')).toBeDefined();


    })
    test('should disabled Previous button when page is 1', () => {
        renderWithRouter(<CustomPagination totalPages={5} />)
        const previousButton = screen.getByText('Previous');
        expect(previousButton.getAttributeNames()).toContain('disabled')
    })
    test('should disabled next button when page is 1', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=5'])
        const nextButton = screen.getByText('Next');
        expect(nextButton.getAttributeNames()).toContain('disabled')
    })
    test('should disabled button 3 when we are in page 3', () => {
        renderWithRouter(<CustomPagination totalPages={5} />, ['/?page=3'])
        const Button = screen.getByText('3');
        const nextButton = screen.getByText('4');
        expect(Button.getAttribute('variant')).toBe('default');
        expect(nextButton.getAttribute('variant')).toBe('outline');
    });
    test('should change page when click number button', () => {
        renderWithRouter(<CustomPagination totalPages={10} />, ['/?page=3'])
        const Button3 = screen.getByText('3');
        const Button2 = screen.getByText('2');
        expect(Button3.getAttribute('variant')).toBe('default');
        fireEvent.click(Button2);
        expect(Button2.getAttribute('variant')).toBe('default');
        expect(Button3.getAttribute('variant')).toBe('outline');

    });
})