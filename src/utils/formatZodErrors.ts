import { ZodError } from 'zod';

export function formatZodErrors(error: ZodError): string[] {
  return error.issues.map((issue: any) => {
    const field = issue.path.join('.') || 'champ';

    // Messages génériques basés sur le code d'erreur
    switch (issue.code) {
      case 'invalid_type':
        if (issue.received === 'undefined') {
          return `Le champ '${field}' est requis`;
        }
        return `Le champ '${field}' doit être de type ${issue.expected}`;

      case 'too_small':
        if (issue.type === 'string') {
          return `Le champ '${field}' doit contenir au moins ${issue.minimum} caractères`;
        }
        return `Le champ '${field}' doit être au moins ${issue.minimum}`;

      case 'too_big':
        if (issue.type === 'string') {
          return `Le champ '${field}' ne peut pas dépasser ${issue.maximum} caractères`;
        }
        return `Le champ '${field}' ne peut pas dépasser ${issue.maximum}`;

      case 'invalid_string':
        if (issue.validation === 'email') {
          return `L'adresse email '${field}' n'est pas valide`;
        }
        return `Le champ '${field}' contient une valeur invalide`;

      case 'invalid_format':
        if (issue.validation === 'email') {
          return `L'adresse email '${field}' n'est pas valide`;
        }
        return `Le format du champ '${field}' est invalide`;

      case 'invalid_literal':
        return `Le champ '${field}' doit être exactement '${issue.expected}'`;

      case 'custom':
        return issue.message || `Erreur sur le champ '${field}'`;

      default:
        return `Erreur de validation sur le champ '${field}': ${issue.message}`;
    }
  });
}