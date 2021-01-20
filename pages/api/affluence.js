import mongoose from "mongoose";
import moment from 'moment';


mongoose.connect(`mongodb+srv://${process.env.NOSQL_USER}:${process.env.NOSQL_PWD}@${process.env.NOSQL_HOST}/${process.env.NOSQL_TABLE}`);
var connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));

export default async (req, res) => {
    try {
        const {method, query} = req;

        switch (method) {
            case "GET":
                connection.db.collection("velib", function(err, collection){
                    collection.find({"record_timestamp": {$regex : moment().format("YYYY-MM-DD")+".*"}, "fields.stationcode": query.code}).toArray(function(err, data){
                        
                        if(data.length > 10){
                            if(data){
                                const base = data[9].fields.ebike + data[9].fields.mechanical

                                let sum = 0;
                                for( var i = 0; i < data.length; i++ ){
                                    sum += parseInt( data[i].fields.ebike + data[i].fields.mechanical, 10 ); 
                                }

                                const avg = Math.floor(sum/data.length);

                                let decreaseValue = base - avg;
                                let pre_percent = (decreaseValue / base) * 100;
                                const percent = Math.floor(100 - pre_percent)

                                res.status(200).json(
                                    {
                                        success: true,
                                        base: base,
                                        average: avg,
                                        percent: percent
                                    }
                                );
                            }else{
                                res.status(500).json(
                                    {
                                        success: false,
                                        error: "Erreur" 
                                    }
                                );
                            }
                        }else{
                            res.status(500).json(
                                {
                                    success: false,
                                    error: "Trop tôt pour analyser" 
                                }
                            );
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