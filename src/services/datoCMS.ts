const requestCmsApi = async ( query: any, variables = {} ) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DATOCMS_API_URL}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_READ_ONLY_API_TOKEN}`
        },
        body: JSON.stringify({
            query,
            variables,
        }),
        
    })

    const json = await res.json();
    if (json.errors) {
        throw new Error("Error fetch API")
    }
    return json.data;
}

export const getAllTechnologys =  async () =>  {
    const data = await requestCmsApi(`
        {
            allTechnologies {
                id
                name
                logo{ url(imgixParams: { fm:jpg, fit: crop, w: 120, h:120 }) }
            }

            _allTechnologiesMeta {
                count
            }
        }
    `);

    return data.allTechnologies;
}