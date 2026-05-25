import { StatusCodes } from 'http-status-codes';
import { Prisma } from '../generated/prisma/client';
import { CustomError } from './index';

function extractPrismaValidationDetail(message: string): string | null {
  const lines = message
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const targetLine = lines.find((line) =>
    /Unknown argument|Argument .* is missing|Invalid value for argument|Expected .*?, provided/i.test(line)
  );

  return targetLine || null;
}

export function handlePrismaError(error: any): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        const field = error.meta?.target as string[] | undefined;
        throw new CustomError(`Dados duplicados: ${field?.join(', ') || 'campo único'}`, StatusCodes.CONFLICT);

      case 'P2025':
        throw new CustomError('Registro não encontrado', StatusCodes.NOT_FOUND);

      case 'P2003':
        throw new CustomError('Violação de integridade referencial', StatusCodes.BAD_REQUEST);

      case 'P2014':
        throw new CustomError('Relação obrigatória não encontrada', StatusCodes.BAD_REQUEST);

      case 'P2000':
        throw new CustomError('Valor muito longo para o campo', StatusCodes.BAD_REQUEST);

      case 'P2001':
        throw new CustomError('Registro não existe', StatusCodes.BAD_REQUEST);

      default:
        throw new CustomError(`Erro de banco de dados: ${error.message}`, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    throw new CustomError('Erro desconhecido no banco de dados', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    throw new CustomError('Erro crítico no banco de dados', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    throw new CustomError('Erro de inicialização do banco de dados', StatusCodes.INTERNAL_SERVER_ERROR);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    console.log('Erro de validação do Prisma:', error.message);
    const detail = extractPrismaValidationDetail(error.message);

    if (detail) {
      throw new CustomError(`Erro de validação dos dados: ${detail}`, StatusCodes.BAD_REQUEST);
    }

    throw new CustomError('Erro de validação dos dados', StatusCodes.BAD_REQUEST);
  }

  throw error;
}
