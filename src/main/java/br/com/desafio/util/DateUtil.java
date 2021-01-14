package br.com.desafio.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;

public class DateUtil {

    private static final int LIMITE_ANO_VALIDO = 2099;

    /**
     * Converte String para Date
     *
     * @param date
     * @param format
     * @return {@link Date}
     */
    public static Date stringToDate(final String date, final String format) {
        try {
            final SimpleDateFormat df = new SimpleDateFormat(format);
            return df.parse(date);
        } catch (final ParseException e) {
            throw new RuntimeException(e);
        }
    }

    public static LocalDate converteDateParaLocalDate(final Date date) {
        if (date == null) {
            return null;
        }
        return Instant.ofEpochMilli(date.getTime()).atZone(ZoneId.systemDefault()).toLocalDate();
    }

    public static Integer calcularIdade(final LocalDate dataNascimetno) {

        final Calendar dataAtual = Calendar.getInstance();
        final int anoAtual = dataAtual.get(Calendar.YEAR);

        final int diaNascimento = dataNascimetno.getDayOfMonth();
        final int mesNascimento = dataNascimetno.getMonthValue();
        final int anoNascimento = dataNascimetno.getYear();

        final String strNiver = anoAtual + "-"
                + "" + mesNascimento + "-" + diaNascimento;
        final Calendar calNiver = Calendar.getInstance();

        try {
            calNiver.setTime(new SimpleDateFormat("yyyy-MM-dd").parse(strNiver));
        } catch (final ParseException ex) {

        }

        final int anos = (dataAtual.getTimeInMillis() < calNiver.getTimeInMillis()) ? (anoAtual - anoNascimento - 1) : anoAtual - anoNascimento;


        return anos;
    }
}
