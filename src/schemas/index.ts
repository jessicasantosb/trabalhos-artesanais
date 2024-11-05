import { z } from 'zod';

export const createSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'O título é obrigatório' })
    .max(30, { message: 'O título pode ter no máximo 30 caracteres' }),
  date: z
    .string()
    .min(1, { message: 'A data é obrigatória' })
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/[12][0-9]{3}$/, {
      message: 'Insira uma data válida DD/MM/AAAA',
    }),
  client: z
    .string()
    .min(1, { message: 'O nome do cliente é obrigatório' })
    .max(30, { message: 'O nome do cliente pode ter no máximo 30 caracteres' }),
  price: z
    .union([
      z
        .string()
        .min(1, { message: 'O preço é obrigatório' })
        .transform((x) => {
          const numStr = x
            .replace(/\./g, '')
            .replace(',', '.')
            .replace(/[^0-9.-]+/g, '');
          return parseFloat(numStr);
        }),
      z.number(),
    ])
    .pipe(
      z.coerce
        .number({ invalid_type_error: 'Insira um número válido' })
        .min(0.0001)
        .max(99999999, { message: 'Valor inválido' }),
    ),
  color: z
    .string()
    .min(1, { message: 'A cor é obrigatória' })
    .max(30, { message: 'A cor pode ter no máximo 30 caracteres' }),
  size: z
    .string()
    .min(1, { message: 'O tamanho é obrigatório' })
    .max(30, { message: 'O tamanho pode ter no máximo 30 caracteres' }),
  description: z
    .string()
    .max(300, { message: 'A descrição pode ter no máximo 300 caracteres' }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email('Insira um email válido')
    .nonempty('O campo email é obrigatório'),
  password: z.string().nonempty('O campo senha é obrigatório'),
});

export const registerSchema = z
  .object({
    name: z.string().nonempty('O campo nome é obrigatório'),
    email: z
      .string()
      .email('Insira um email válido')
      .nonempty('O campo email é obrigatório'),
    password: z
      .string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      .nonempty('O campo senha é obrigatório'),
    confirmPassword: z
      .string()
      .nonempty('O campo confirmação de senha é obrigatório'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas devem ser iguais',
    path: ['confirmPassword'],
  });
