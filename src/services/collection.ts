const baseUrl = "/api/v1/collections"

export async function fetchCollections(collectionAddress?: "string") {
	//http://localhost:3040/api/v1/collections?collectionAddress=0xf5de760f2e916647fd766B4AD9E85ff943cE3A2b

	const resp = await (await fetch(`${baseUrl}`)).json();
	return resp;
}