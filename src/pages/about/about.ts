import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import {HttpClient} from "@angular/common/http";
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
x=1
err=""

lat:any;
long:any;

base64Image:string;
name=""
imageData="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0PDg0NDQ0NDQ0NDQ8NDQ4NFhEWFhURExMYHSggGBolGxUWITEhJSkrLi4uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAJ8BPgMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAgEDBAUH/8QAMBABAQACAAIGCAcBAQAAAAAAAAECEQMEEiExQVJxFTJRYWKRobEFExQigZKi0XL/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A/RAAAAAAAAAADQ0GaNNAZo0oBOjSzQI0adDQOejTpo0Dno0vRoEaNLYCdGlMBg2sAAAAAAAAAAAAAAAAAAAAAayKBjRoDdEipATpulaboE6NLkNAjRpejQIZpemaBGmLsZYCBVTQZWNYAAAAAAAAAAAAAAAAAAAABFJioDWyEVAFSEipAZMVSNkVICZG6Xo0COizTthw7l1SW+UdOLyuWGPSuu3Wu2wHk0yx1sTYDlYyulibAc9JrpU0EJVUgAAAAAAAAAAAAAAAAAAAARcRF4gqKjIuA2RWMZHfg8HLL1cbff3fMESKmL28LkPHf4x/69Mxw4fZjd+7G2/MHi4XKZ5d2p7+p6ceUwx68rvz6ozPj8S+rhZ77La4ZY53rsyvnKD0Zc1hj1YzflNRWN/N4dl7bueV7nk/Ly8N+Vd+U3LZZdWey9oPBcU2PbzXBvStktl6+qb63C8HPwZf1oPNYmx1sRYDlU10sRkDlUrqAAAAAAAAAAAAAAAAAAAAAI6YucdMQXF4oi8Qev8AD5jc9ZSXc6t+17+Z5n8vUmPbOr2Pk8PKyyztllj6nN49PhzOd2sv47wOT4uWeWXSvdNTuis+a6Ns6O9X2uX4d25eUc+P6+XmD0fq/h+p+q+H6rnLY613+3byZTVs9lsB6f1Xw/Vl5v4fq8yuJhcdb75sHa858P1duX43T31a179vn16uQ7MvOfYHg4vrZed+7lXbi+tfO/dxoIrnXSudBzyRV5IoAAAAAAAAAAAAAAAAAAAAEdMXOOmILi8XOLgLj6n4fn0sLhe77V8qPVyXF6OePsv7b/IPXyWHRzzxvc48f18vN75w9Z3L24yXzj5/Mevl5g7Y8zlJrq8+9y2rluF07u+rO2+33PTxOWl7P2/YHPluFu7vZOz316eJw5lOvuVjjJJJ2RoPnc1h0curss3HbkOzLzn2bz+O8Zl7L9Kn8OvVl5wHh4vrXzv3csl8W/uy8793Ogioq7UZA55IXkgAAAAAAAAAAAAAAAAAAAACLiIqAuKiIqA6Sqlc5VSg+7yvE6eGN79avnHh5jDLp5axys32yVz5Tm/y5ZZuXr7dar0+kp4L/YDHmOJJqcPUnw5N/VcXwf5yPSM8H1PSM8F+YN/VcTwf5yZ+q4vg/wA5HpGeC/M9IzwfUE8Tj8TKWXDqvV6uTr+HY2TLcs652zTn6SngvzZ6Tngv9geHi392X/q/dztbnlu2+22otBlTk2poIqVVIAAAAAAAAAAAAAAAAAAAAEVEqBqpUNBcqtucqtguVUrnK3YOkrduezYOmzbn0i0FbZck7ZsG2stZtloFqaUBiWsAAAAAAAAAAAAAAAAAAAAAaxoDWAKakBcptICzaGgrZtIDdm07Ng3bGAAMArG1gAAAAAAAAAAAAAAAAAAAABsAaMAaMAUJAUJAUJAUJAaMAaMAbWAAAAAAAAAAAD//2Q==";

danger_level="0";
feedback_text=""
disabled=1
  constructor(public navCtrl: NavController,
  				private geolocation: Geolocation,
  				private camera: Camera,
  				private crop: Crop,
  				public http:HttpClient,
          private file: File,
          private transfer: FileTransfer) {
    this.Capture()
    this.LocationWatch()
  }

  Capture()
  {
  	this.x=1+this.x

  	  	const options: CameraOptions = {
		  quality: 100,
		  destinationType: this.camera.DestinationType.FILE_URI,
		  encodingType: this.camera.EncodingType.JPEG,
		  mediaType: this.camera.MediaType.PICTURE
		}
	  	this.camera.getPicture(options).then((imageData) => {
		 // imageData is either a base64 encoded string or a file URI
		 // If it's base64 (DATA_URL):
		 this.imageData=imageData;
		 this.base64Image = 'data:image/jpeg;base64,' + imageData;
		 this.x=99;

		}, (err) => {
		  this.err=err
		  console.log(err)
		});
  }
   LocationWatch()
  {
  		this.geolocation.getCurrentPosition().then((resp) => {
			console.log(resp.coords.latitude);
		 	this.lat = resp.coords.latitude;
		 	console.log(resp.coords.longitude);
		 	this.long = resp.coords.longitude;
		}).catch((error) => {
      this.err =error
		  console.log('Error getting location', error);
		});	
  }
  CropImage()
  {
  	this.crop.crop(this.imageData, {quality: 100})
	  .then(
	    (newImage) => {
	    	console.log('new image path is: ' + newImage)
	    	this.imageData = newImage
	    },
	    (error) => {
	    	console.error('Error cropping image', error)
	    	this.err=error
			}
	  );
  }
  demo1()
  {
    this.imageData = "file:///storage/emulated/0/Android/data/io.ionic.starter/cache/4.jpg"
  }
  demo2()
  {
    this.imageData = "file:///storage/emulated/0/Android/data/io.ionic.starter/cache/8.jpg"
  }
  demo3()
  {
    this.imageData = "file:///storage/emulated/0/Android/data/io.ionic.starter/cache/12.JPG"
  }
  UploadImage(){
    this.disabled=0
    let list= this.imageData.split('/')
    this.name = list[list.length-1].split('?')[0]
  	let url = "http://10.0.49.161:8000/potholes/view/";
  	let postData = new FormData();
    this.file.readAsDataURL("file:///storage/emulated/0/Android/data/io.ionic.starter/cache/", this.name )
    .then(res => {
        this.err="res"+res
        // var blob = new Blob([res], { "type": "image/jpg" });
        postData.append('img',res)
        postData.append('danger_level',this.danger_level)
        postData.append('user_feedback',this.feedback_text)
        postData.append('lat',this.lat)
        postData.append('long',this.long)
        this.http.post(url,postData).subscribe((res)=> {
          console.log(res);
          this.err="res"
          this.disabled=1
        },
        (err)=>{
          console.log(err);
          this.err="err"
          this.disabled=1
        });
    })
    .catch(err => this.err="err"+err);
    
  }

//   upload() {
//   const fileTransfer: FileTransferObject = this.transfer.create();
//   let options: FileUploadOptions = {
//      fileKey: 'file',
//      fileName: 'name.jpg',
//      headers: {},
//   }

//   fileTransfer.upload(this.imageData, "http://10.0.38.184:8000/potholes/view/", options)
//    .then((data) => {
//      // success
//      this.err="data";
//    }, (err) => {
//      // error
//      this.err="err";
//    })
// }
}
