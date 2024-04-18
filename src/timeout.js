// workaround for too many API requests

function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

export default timeout;