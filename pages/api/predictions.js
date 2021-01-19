import mongoose from "mongoose";

const VelibSchema = new mongoose.Schema({
    datasetid: {type: String},
    recordid: {type: String},
    fields: {
        stationcode: {type: String},
        ebike: {type: Number},
        numdocksavailable: {type: Number},
        mechanical: {type: Number},
    },
    record_timestamp: {type: String},
});


export default async (req, res) => {
    const connection = await mongoose.createConnection(`mongodb+srv://${process.env.NOSQL_USER}:${process.env.NOSQL_PWD}@${process.env.NOSQL_HOST}/${process.env.NOSQL_TABLE}`,{
        useNewUrlParser: true,
        bufferCommands: false,
        bufferMaxEntries: 0,
        useUnifiedTopology: true}
    );

    try {
        const velib = connection.model("velib", VelibSchema);
        const {method} = req;
        
        switch (method) {
        case "GET":
            velib.findById("5f3ed6415194dd1eef9b2501").then(response => {
                console.log('response'+response);
            }).catch(err => {
                console.log('err'+err);
            });
            res.status(200).json(response);

            break;
        default:
            res.setHeader("Allow", ["GET"]);
            res.status(405).end(`Method ${method} Not Allowed`);
        }
    } catch (e) {
        connection.close();
        res.status(500).json({ error: e.message || "something went wrong" });
    }
    
};