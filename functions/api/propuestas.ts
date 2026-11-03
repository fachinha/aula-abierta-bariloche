// Cloudflare Pages Function: /api/propuestas
export interface Env {
  DB?: any;
}

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;

  if (env.DB) {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM propuestas_comunitarias ORDER BY creado_en DESC').all();
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
        'INSERT INTO propuestas_comunitarias (id, postulante_nombre, postulante_email, titulo_propuesta, tipo, descripcion, enlace_referencia) VALUES (?, ?, ?, ?, ?, ?, ?)'
      )
        .bind(
          body.id,
          body.nombre,
          body.email,
          body.titulo,
          body.tipo,
          body.descripcion,
          body.enlace || ''
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
