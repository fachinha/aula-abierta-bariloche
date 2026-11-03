// Cloudflare Pages Function: /api/inscripciones
export interface Env {
  DB?: any;
}

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;

  if (env.DB) {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM inscripciones ORDER BY creado_en DESC').all();
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }

  return new Response(JSON.stringify([]), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  try {
    const body: any = await request.json();

    if (env.DB) {
      await env.DB.prepare(
        'INSERT INTO inscripciones (id, taller_id, estudiante_nombre, estudiante_email, estudiante_dni, estudiante_telefono) VALUES (?, ?, ?, ?, ?, ?)'
      )
        .bind(
          body.id,
          body.tallerId,
          body.nombre,
          body.email,
          body.dni,
          body.telefono || ''
        )
        .run();
    }

    return new Response(JSON.stringify(body), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 400 });
  }
};
