// Cloudflare Pages Function: /api/cursos
export interface Env {
  DB?: any; // Cloudflare D1 database binding
}

export const onRequestGet = async (context: { env: Env }) => {
  const { env } = context;

  // Si Cloudflare D1 está configurado en el dashboard
  if (env.DB) {
    try {
      const { results } = await env.DB.prepare('SELECT * FROM cursos ORDER BY creado_en DESC').all();
      return new Response(JSON.stringify(results), {
        headers: { 'Content-Type': 'application/json' }
      });
    } catch (e: any) {
      return new Response(JSON.stringify({ error: e.message }), { status: 500 });
    }
  }

  // Si no está vinculado D1 aún, responder con mensaje informativo
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
        'INSERT INTO cursos (id, titulo, tipo, nivel, subnivel, area, duracion, descripcion, miniatura_url, creador_nombre) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
      )
        .bind(
          body.id,
          body.title,
          'curso',
          body.level,
          body.gradeKey,
          body.area,
          body.duration,
          body.description,
          body.thumbnail,
          body.instructor
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
