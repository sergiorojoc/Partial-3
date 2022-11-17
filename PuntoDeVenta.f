        program puntodeVenta
        implicit none
        integer prodTot, i
        real precioUni, operador, numProd, acumulador
        character (30) productName
        acumulador = 0
        write(*,*) 'Escriba cu?ntos productos TOTALES comprar?'
        read(*,*) prodTot
        do i = 1, prodTot
        write(*,*) 'Escriba el nombre del prodcuto: '
        read(*,*) productName
        write(*,*) 'Escriba el precio del producto: '
        read(*,*) precioUni
        write(*,*) '?Cu?ntos productos de este tipo comprar?? '
        read(*,*) numProd
        operador = numProd * precioUni
        acumulador = acumulador + operador
        end do
        if (acumulador > 1000) then
        acumulador = acumulador * 0.85
        write(*,*) 'El total a pagar con 15% de descuento es: '
        write(*,*) acumulador
        else
        write(*,*) 'El total a pagar es: '
        write(*,*) acumulador
        end if
        pause
        end program puntodeVenta
