import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  api: string = 'https://apiadonissoa.herokuapp.com/api/';
  url: string = 'https://fcm.googleapis.com/fcm/send'
  constructor(
    private http : HttpClient
  ) { }

  loginUser(data:any, httpOptions):Observable<any>{
    return this.http.post(`${this.api}login`,data, httpOptions)
  }

  eliminarInventario(id:any, httpOptions): Observable<any>{
    return this.http.delete(`${this.api}inventories/${id}`,httpOptions)
  }

  eliminarProducto(id:any, httpOptions): Observable<any>{
    return this.http.delete(`${this.api}products/${id}`,httpOptions)
  }

  eliminarTransaction(id:any, httpOptions): Observable<any>{
    return this.http.delete(`${this.api}transactions/${id}`, httpOptions)
  }

  registrarse(data:any, httpOptions): Observable<any>{
    return this.http.post(`${this.api}register`, data, httpOptions)
  }

  crearProducto(data:any, httpOptions): Observable<any>{
    return this.http.post(`${this.api}products`, data, httpOptions)
  }

  crearInventario(data:any, httpOptions): Observable<any>{
    return this.http.post(`${this.api}inventories`, data, httpOptions)
  }

  obtenerUnInventario(id:any, httpOptions): Observable<any>{
    return this.http.get(`${this.api}inventories/${id}`, httpOptions)
  }

  hacerVenta(data: any, httpOptions): Observable<any>{
    return this.http.post(`${this.api}sales`, data, httpOptions)
  }

  obtenerTodoInventario(httpOptions): Observable<any>{
    return this.http.get(`${this.api}inventories`, httpOptions)
  }

  obtenerTodoProducto(httpOptions): Observable<any>{
    return this.http.get(`${this.api}products`, httpOptions)
  }

  obtenerTransaciones(httpOptions): Observable<any>{
    return this.http.get(`${this.api}transactions`, httpOptions)
  }

  obtenerSales(httpOptions): Observable<any>{
    return this.http.get(`${this.api}sales`, httpOptions)
  }

  actualizarTransaction(id:any, data:any, httpOptions): Observable<any>{
    return this.http.put(`${this.api}transactions/${id}`, data, httpOptions)
  }

  actualizarInventario(id:any, data:any, httpOptions): Observable<any>{
    return this.http.put(`${this.api}inventories/${id}`, data, httpOptions)
  }

  actualizarProducto(id: any, data:any, httpOptions): Observable<any>{
    return this.http.put(`${this.api}products/${id}`, data, httpOptions)
  }

  actualizarSale(id:any, data:any, httpOptions): Observable<any>{
    return this.http.put(`${this.api}sales/${id}`, data, httpOptions)
  }


  suscribirse(token:any): Observable<any>{
    let link = "https://iid.googleapis.com/iid/v1:batchAdd"
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'key=AAAAkQMQKXA:APA91bG9l4ImZgp5604AFS7giocOyL212H8OlGEcKSOdPJRs5fbN6Vs2cuaFcS4dPoNUsTLAropVjRv4oRGbedjFFzhdyXt3XVY7BnBelEN5TVJHg8N9TycJDwCJkNbTusJF4j8F-69V',
      })
    }

    const data = {
      to: "/topics/todos",
      registration_tokens: [token]
    }

    return this.http.post(link, data ,httpOptions)
  }
  
  enviarNotificacion(message:any, title:any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'key=AAAAkQMQKXA:APA91bG9l4ImZgp5604AFS7giocOyL212H8OlGEcKSOdPJRs5fbN6Vs2cuaFcS4dPoNUsTLAropVjRv4oRGbedjFFzhdyXt3XVY7BnBelEN5TVJHg8N9TycJDwCJkNbTusJF4j8F-69V',
      })
    }

    const data = {
      data: {
        title: title,
        message: message,
      },
      to: "/topics/todos"
    }
    
    return this.http.post(this.url, data, httpOptions)
  }

  enviarNotificacionAceptar(message:any, title:any): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'key=AAAAkQMQKXA:APA91bG9l4ImZgp5604AFS7giocOyL212H8OlGEcKSOdPJRs5fbN6Vs2cuaFcS4dPoNUsTLAropVjRv4oRGbedjFFzhdyXt3XVY7BnBelEN5TVJHg8N9TycJDwCJkNbTusJF4j8F-69V',
      })
    }

    let mensaje = {
      notification:{
        title: title, 
        body: message
      },
      to: 'd5ro5ulmDEHH0cgK4BtT2r:APA91bHneHgUnybBpElfwRUTJKmk6nTndL0Kv05NA5dnsC6Rx7qSstWLMDqvhA5Ak_G1r-_jiw3q_OwxZ0Yt_qE9IYI3lMm-SxXwcmbyPQ-oK7NOmZ0NEff0nKSjcj0VPGxEg0gJnIuI'
    }
    
    return this.http.post(this.url, mensaje, httpOptions)
  }
}
