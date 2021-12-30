//枚举类型
enum Status {
  OFFLINE,
  ONLINE,
  DELETE
}

//枚举类型可以反查
console.log(Status[0])
console.log(Status[1])


// const Status = {
//   OFFLINE: 0,
//   ONLINE: 1,
//   DELETE: 2
// }

function getResult(status: number) {
  if (status == Status.OFFLINE) {
    return 'offline'
  } else if (status == Status.ONLINE) {
    return 'online'
  } else if (status == Status.DELETE) {
    return 'delete'
  }
  return 'error'
}

//用enmu 类型后  也可以传 0  或者 Status.OFFLINE
// const result = getResult(Status.OFFLINE)
const result = getResult(0)
console.log('result: ', result);