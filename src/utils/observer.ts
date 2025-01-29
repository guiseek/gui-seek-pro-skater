import {Callback} from '../interfaces'

export class Observer<T> {
  #subscribers = new Set<Callback<T>>()

  subscribe(callback: Callback<T>) {
    this.#subscribers.add(callback)

    const unsubscribe = () => {
      return this.unsubscribe(callback)
    }

    return {unsubscribe}
  }

  unsubscribe(callback: Callback<T>) {
    this.#subscribers.delete(callback)
  }

  emit(value: T) {
    this.#subscribers.forEach((callback) => callback(value))
  }
}
