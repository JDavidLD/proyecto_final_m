function [consumo, velocidad_optima] = calculo_consumo(velocidad, peso, terreno)
    % Datos de velocidad y consumo (ejemplo)
    Velocidades = [40, 50, 60, 70, 80, 90, 100];
    Consumos_base = [8.5, 7.0, 6.2, 6.5, 7.1, 8.0, 9.0];

    % Ajuste por peso y terreno (esto es solo un ejemplo, puedes adaptarlo)
    ajuste_peso = peso / 1000;  % Relación con el peso base (ajustar según sea necesario)
    ajuste_terreno = terreno;   % Ajuste por tipo de terreno (1: plano, 2: subida, 3: bajada)

    % Cálculo del consumo ajustado
    Consumos_final = Consumos_base .* ajuste_terreno .* ajuste_peso;

    % Interpolación para el consumo estimado
    consumo = IntLineal(velocidad, Velocidades, Consumos_final);

    % Calculamos la velocidad óptima con el método de Newton-Raphson
    velocidad_optima = velocidad_optima_newton(Velocidades, Consumos_final);
end
