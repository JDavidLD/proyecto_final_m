function [consumo, v_opt] = calculo_consumo(vel, peso, terreno)
  velocidades = [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180];
  consumos_base = [8.2, 7.4, 6.5, 6.0, 5.8, 6.2, 6.9, 7.8, 8.9, 10.2, 11.7, 13.5, 15.5, 17.8, 20.4];

  switch terreno
    case 1, factor = 1;
    case 2, factor = 1.15;
    case 3, factor = 0.9;
  endswitch

  peso_ref = 1200;
  peso_factor = 1 + (peso - peso_ref) / 10000;
  consumos = consumos_base * factor * peso_factor;

  consumo = interp1(velocidades, consumos, vel, "spline");

  objetivo = @(v) interp1(velocidades, consumos, v, "spline");
  v_opt = fminbnd(objetivo, min(velocidades), max(velocidades));
end

