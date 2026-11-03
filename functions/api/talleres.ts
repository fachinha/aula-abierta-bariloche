// Cloudflare Pages Function: /api/talleres
export interface Env {
  DB?: any;
}

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;

  if (env.DB) {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM talleres').all();
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }

  return new Response(JSON.stringify({ status: 'ok', source: 'edge-runtime' }), {
    headers: { 'Content-Type': 'application/json' }
  });
};

export const onRequestPost = async (context: { request: Request; env: Env }) => {
  const { request, env } = context;
  try {
    const body: any = await request.json();

    if (env.DB) {
      await env.DB.prepare(
        'INSERT INTO talleres (id, titulo, tipo, estado, espacio_id, tallerista_nombre, duracion, miniatura_url, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )
        .bind(
          body.id,
          body.title,
          body.type,
          body.statusType || 'recorded',
          body.espacioId,
          body.instructor,
          body.duration,
          body.thumbnail,
          body.description
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
