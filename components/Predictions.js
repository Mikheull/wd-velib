import React, {Component} from 'react';
import axios from 'axios'
import { Line } from '@reactchartjs/react-chart.js'
import moment from 'moment';
import 'moment/locale/fr';

// Styles
import '../public/styles/map.module.css';

class Predictions extends Component {
    constructor(props) {
        super(props);

        this.state = {
          pr_data_mechanical: [],
          pr_data_electric: [],
          pr_data_places: [],
          pr_date_query: moment().format("YYYY-MM-DD"),
        }
    }

    componentDidMount() {
      this.fetchData(this.state.pr_date_query);
    }

    fetchData(startdate) {
      var newDate = moment(startdate, "YYYY-MM-DD");
      newDate = newDate.add(1, "days");
      newDate = newDate.format("YYYY-MM-DD");

      let pr_data_mechanical = [];
      let pr_data_electric = [];
      let pr_data_places = [];

      axios.get(`/api/predictions?code=${this.props.code}&date=${newDate}`)
        .then((response) => {
          let i = true;

          if(response.data.data){
            Object.keys(response.data.data).forEach(element => {
              if(i && response.data.data[element].fields){
                i = false
                pr_data_mechanical.push(response.data.data[element].fields.mechanical);
                pr_data_electric.push(response.data.data[element].fields.ebike);
                pr_data_places.push(response.data.data[element].fields.numdocksavailable);
              }else{
                i = true
              }
            });
            this.setState({pr_data_mechanical: pr_data_mechanical});
            this.setState({pr_data_electric: pr_data_electric});
            this.setState({pr_data_places: pr_data_places});
          }
        })
      .catch((error)=>{
        console.log(error);
      });
    }

    render() {
        const data = {
            labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
            datasets: [
              {
                label: 'Mecanique',
                data: this.state.pr_data_mechanical,
                fill: false,
                backgroundColor: 'rgb(180, 229, 48)',
                borderColor: 'rgba(180, 229, 48, 0.5)',
                yAxisID: 'y-axis-1',
              },
              {
                label: 'Éléctrique',
                data: this.state.pr_data_electric,
                fill: false,
                backgroundColor: 'rgb(48, 132, 229)',
                borderColor: 'rgba(48, 132, 229, 0.5)',
                yAxisID: 'y-axis-1',
              },
              {
                label: 'Places',
                data: this.state.pr_data_places,
                fill: false,
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgba(255, 255, 255, 0.5)',
                yAxisID: 'y-axis-1',
              },
            ],
        }
        const options = {
            scales: {
                yAxes: [
                  {
                      type: 'linear',
                      display: false,
                      position: 'left',
                      id: 'y-axis-1',
                  }
                ],
            },
        }
        
        return (
            <section>
                <Line data={data} options={options} />
            </section>
        )
    }
}

export default Predictions;