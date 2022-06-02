import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('TEST APP', () => {
    test('тестирование основных компонентов', () => {
        render( < App / > );
        const input = screen.getByPlaceholderText(/Введите последовательность чисел/i);
        const button = screen.getByRole('button');
        const heading = screen.getByText(/Введите от трех до двадцати любых чисел через запятую/i)
        expect(button).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(heading).toBeInTheDocument();
    });

    test('тестирование результата простое', () => {
        render( < App / > );
        const input = screen.getByPlaceholderText(/Введите последовательность чисел/i);
        const button = screen.getByRole('button');
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('');
        fireEvent.input(input, {
            target: { value: '1,55,66,4,2,48' }
        })
        fireEvent.click(button)
        expect(screen.queryByTestId('result')).toContainHTML('Результат: 3');
        expect(screen.queryByTestId('error')).toContainHTML('');
    });

    test('тестирование ошибки со строкой в последовательности', () => {
        render( < App / > );
        const input = screen.getByPlaceholderText(/Введите последовательность чисел/i);
        const button = screen.getByRole('button');
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('');
        fireEvent.input(input, {
            target: { value: '1,55,erere,4,2,48' }
        })
        fireEvent.click(button)
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('Вы добавили в последовательность строку. Данные невалидны.');
    });

    test('тестирование c лишними запятыми, пробелами и случайными символами', () => {
        render( < App / > );
        const input = screen.getByPlaceholderText(/Введите последовательность чисел/i);
        const button = screen.getByRole('button');
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('');
        fireEvent.input(input, {
            target: { value: ',,66,,, 55+,, 42rrr,4,,900a,,,,, 48jjfg,,198--,32,, 2344,' }
        })
        fireEvent.click(button)
        expect(screen.queryByTestId('result')).toContainHTML('Результат: 36');
        expect(screen.queryByTestId('error')).toContainHTML('');
    });

    test('тестирование пустого инпута', () => {
        render( < App / > );
        const input = screen.getByPlaceholderText(/Введите последовательность чисел/i);
        const button = screen.getByRole('button');
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('');
        fireEvent.input(input, {
            target: { value: '' }
        })
        fireEvent.click(button)
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('Поле не должно быть пустым');
    });

    test('тестирование менее трех элементов', () => {
        render( < App / > );
        const input = screen.getByPlaceholderText(/Введите последовательность чисел/i);
        const button = screen.getByRole('button');
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('');
        fireEvent.input(input, {
            target: { value: '198,22' }
        })
        fireEvent.click(button)
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('Пожалуйста, введите минимум три числа');
    });

    test('тестирование более двадцати элементов', () => {
        render( < App / > );
        const input = screen.getByPlaceholderText(/Введите последовательность чисел/i);
        const button = screen.getByRole('button');
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('');
        fireEvent.input(input, {
            target: { value: '198,22,99,6437,12,333,88,1,44,90,32,123,55,654,3,7654,9876,123,444,0,21' }
        })
        fireEvent.click(button)
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('Пожалуйста, введите до двадцати чисел');
    });

    test('тестирование с отрицательными числами и нецелыми числами', () => {
        render( < App / > );
        const input = screen.getByPlaceholderText(/Введите последовательность чисел/i);
        const button = screen.getByRole('button');
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('');
        fireEvent.input(input, {
            target: { value: '55,-22,3,44,-3.7,55,-10,-11.3' }
        })
        fireEvent.click(button)
        expect(screen.queryByTestId('result')).toContainHTML('Результат: -33.3');
        expect(screen.queryByTestId('error')).toContainHTML('');
    });

    test('дополнительное тестирование', () => {
        render( < App / > );
        const input = screen.getByPlaceholderText(/Введите последовательность чисел/i);
        const button = screen.getByRole('button');
        expect(screen.queryByTestId('result')).toContainHTML('');
        expect(screen.queryByTestId('error')).toContainHTML('');
        fireEvent.input(input, {
            target: { value: ',,,1aac1aac,  443,,8776fdfdb, 11,,,, 098,  23,,4,90lf,,,,' }
        })
        fireEvent.click(button)
        expect(screen.queryByTestId('result')).toContainHTML('Результат: 5');
        expect(screen.queryByTestId('error')).toContainHTML('');
    });
});