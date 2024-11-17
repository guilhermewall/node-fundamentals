import { stdout } from "node:process";
import { Readable, Writable, Transform } from "node:stream";

// primeira function esta lendo dados de segundo em segundo
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

// essa minha terceira function é uma intermediaria, onde necessariamente ela precisa devolver um valor no callback para a ultima function mostrar o dado
class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed))); // aqui é necessario transformar em Buffer e o dado tambem precisa ser uma string
  }
}

// segunda function esta processando os dados enquanto a primeria vai mandando os dados
class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);

    callback(); //aqui ele encerra tudo que precisa ser executado
  }
}

new OneToHundredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());
