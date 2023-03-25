import { Categoria } from "../../entities/menu";

interface ItemElementoCategoriaProps {
	categoria: Categoria;
}

export default function ItemElementoCategoria({
	categoria,
}: ItemElementoCategoriaProps) {
	return <div>{categoria.nome}</div>;
}
