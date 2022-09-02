export default async function handler(req, res) {
    const { email, shapeId } = req.query;

    let sql;
    
    if(shapeId) {
        sql = `SELECT * FROM tryshape.likes WHERE shape_id='${shapeId}' AND email='${email}'`;
    } else {
        sql = `SELECT * FROM tryshape.likes WHERE email = '${email}'`;
    }
    
    const request = await fetch(process.env.NEXT_PUBLIC_DB_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${process.env.NEXT_PUBLIC_DB_AUTHORIZATION}`,
      },
      body: JSON.stringify({
        operation: "sql",
        sql: sql,
      }),
    });
  
    const data = await request.json();
    // console.log(data);
  
    res.status(200).json(data);
  }