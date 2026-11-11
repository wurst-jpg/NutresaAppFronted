import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { mockConfig } from '../services/api';

function renderForm() {
  return render(
    <MemoryRouter initialEntries={['/register']}>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/home" element={<p>Pantalla Home</p>} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </MemoryRouter>,
  );
}

beforeEach(() => {
  mockConfig.delay = 0;
});

describe('RegisterForm', () => {
  it('muestra errores al enviar vacío y al salir de un campo inválido', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText('Correo corporativo'), 'ana@gmail.com');
    await user.tab();
    expect(await screen.findByText(/correo corporativo \(no se admiten/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Correo corporativo')).toHaveAttribute('aria-invalid', 'true');

    await user.click(screen.getByRole('button', { name: /crear cuenta/i }));
    expect(await screen.findByText(/nombre es obligatorio/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Rol')).toHaveAccessibleDescription('Selecciona un rol.');
    expect(screen.queryByText('Pantalla Home')).not.toBeInTheDocument();
  });

  it('con datos válidos muestra el toast de éxito y navega a /home', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText('Nombre completo'), 'Ana Pérez');
    await user.type(screen.getByLabelText('Correo corporativo'), 'ana@empresa.com');
    await user.type(screen.getByLabelText('Contraseña'), 'secreta1!');
    await user.type(screen.getByLabelText('Confirmar contraseña'), 'secreta1!');
    await user.selectOptions(screen.getByLabelText('Rol'), 'COLABORADOR');
    await user.selectOptions(screen.getByLabelText('Departamento'), 'FINANZAS');
    await user.click(screen.getByRole('button', { name: /crear cuenta/i }));

    await waitFor(() => expect(screen.getByText('Pantalla Home')).toBeInTheDocument());
    expect(screen.getByRole('status')).toHaveTextContent(/cuenta creada/i);
  });
});
