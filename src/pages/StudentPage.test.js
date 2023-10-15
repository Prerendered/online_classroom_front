import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentPage from './forum_student';

describe('StudentPage Smoke Test', () => {
    it('renders StudentPage without crashing', () => {
        render(<StudentPage />);
        // Check if the component renders without errors
        const forumTitle = screen.getByText(/Online Forum/i);
        expect(forumTitle).toBeInTheDocument();

        // Check if the "Ask a Question" button is present
        const askQuestionButton = screen.getByText(/Ask a Question/i);
        expect(askQuestionButton).toBeInTheDocument();
    });

    it('opens and closes the Ask a Question dialog', () => {
        render(<StudentPage />);
        const askQuestionButton = screen.getByText(/Ask a Question/i);

        // Check if the "Ask a Question" dialog opens when the button is clicked
        fireEvent.click(askQuestionButton);
        const dialogTitle = screen.getByText(/Ask a Question/i);
        expect(dialogTitle).toBeInTheDocument();

        // Check if the dialog closes when the Cancel button is clicked
        const cancelButton = screen.getByText(/Cancel/i);
        fireEvent.click(cancelButton);
        expect(dialogTitle).not.toBeInTheDocument();
    });

    it('opens and closes the Sort by Category dialog', () => {
        render(<StudentPage />);
        const sortButton = screen.getByText(/Sort by Category/i);

        // Check if the "Sort by Category" dialog opens when the button is clicked
        fireEvent.click(sortButton);
        const dialogTitle = screen.getByText(/Sort by Category/i);
        expect(dialogTitle).toBeInTheDocument();

        // Check if the dialog closes when the Cancel button is clicked
        const cancelButton = screen.getByText(/Cancel/i);
        fireEvent.click(cancelButton);
        expect(dialogTitle).not.toBeInTheDocument();
    });
});
