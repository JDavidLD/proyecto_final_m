function v_opt = velocidad_optima_newton(Velocidades, Consumos)
    TOL = 0.001;         % Tolerancia
    sw = 1;              % Variable de control del ciclo
    x1 = 60;             % Valor inicial de velocidad (puedes ajustarlo según los datos)
    Cont = 1;            % Contador de iteraciones
    max_iter = 100;      % Límite de iteraciones

    while sw == 1 && Cont <= max_iter
        % Evaluamos la función de consumo en x1 (velocidad actual)
        f = IntLineal(x1, Velocidades, Consumos);  % Consumo en x1

        % Evaluamos la derivada de la función de consumo
        % Usamos la aproximación centrada para la derivada
        h = 0.01;  % Paso para calcular la derivada numérica
        f_prime = (IntLineal(x1 + h, Velocidades, Consumos) - IntLineal(x1 - h, Velocidades, Consumos)) / (2 * h);

        % Método de Newton-Raphson
        x2 = x1 - (f / f_prime);

        % Verificar si la diferencia entre x2 y x1 es menor que la tolerancia
        if abs(x2 - x1) <= TOL
            v_opt = x2;  % La velocidad óptima es la última estimación
            sw = 0;      % Termina el ciclo
        else
            x1 = x2;  % Actualiza la velocidad para la siguiente iteración
        end

        Cont = Cont + 1;  % Incrementa el contador de iteraciones
    endwhile

    % Si no converge, devolver el último valor
    if Cont > max_iter
        disp('Advertencia: No se alcanzó la convergencia');
    end
end
