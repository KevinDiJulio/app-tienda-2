import { Producto } from "../types";

type Props = {
  producto: Producto;
};

export default function TarjetaProducto({ producto }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 flex flex-col gap-2">
      <div className="text-5xl">{producto.emoji}</div>
      <h2 className="text-lg font-semibold">{producto.nombre}</h2>
      <p className="text-gray-500 text-sm">{producto.descripcion}</p>
      <span className="font-bold text-lg mt-2">${producto.precio.toLocaleString("es-AR")}</span>
    </div>
  );
}
