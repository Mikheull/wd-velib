import mongoose from "mongoose";

mongoose.connect(`mongodb+srv://${process.env.NOSQL_USER}:${process.env.NOSQL_PWD}@${process.env.NOSQL_HOST}/${process.env.NOSQL_TABLE}`);
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

export default async (req, res) => {
    try {
        const {method, query} = req;

        switch (method) {
            case "GET":
                connection.db.collection("sample", function(err, collection){
                    collection.find({"record_timestamp": {$regex : query.date+".*"}, "fields.stationcode": query.code}).toArray(function(err, data){
                        if(data){
                            res.status(200).json({data: data});
                        }else{
                            res.status(500).json();
                        }
                    })
                });
                break;
            default:
                res.setHeader("Allow", ["GET"]);
                res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        res.status(500).json({ error: e.message || "something went wrong" });
    }
    
};