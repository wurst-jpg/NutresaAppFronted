// Filtra por texto (título o descripción) y por departamento ('' = todos).
export function filterVideos(videos, query = '', departamento = '') {
  const q = query.trim().toLowerCase();
  return videos.filter((v) => {
    const matchesText =
      !q || v.titulo.toLowerCase().includes(q) || v.descripcion.toLowerCase().includes(q);
    const matchesDept = !departamento || v.departamento === departamento;
    return matchesText && matchesDept;
  });
}
