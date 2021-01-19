package br.com.desafio.util;

import com.google.gson.Gson;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.zip.GZIPInputStream;


public class ServiceApiExternaBase {

    protected final <T> T getObject(final Class<T> type, final String s) {
        final Gson gson = new Gson();
        return gson.fromJson(s, type);
    }

    protected final String get(final String urlToRead) throws IOException {
        final StringBuilder stringBuilder = new StringBuilder();
        final URL url = new URL(urlToRead);
        final HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Accept-Encoding", "gzip");

        BufferedReader rd = null;
        if ("gzip".equals(conn.getContentEncoding())) {
           rd = new BufferedReader(new InputStreamReader(new GZIPInputStream(conn.getInputStream()), "UTF-8"));
        } else {
           rd = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
        }

        rd.lines().forEach(l -> stringBuilder.append(l.trim()));

        return stringBuilder.toString();
    }

    protected final String post(final String urlToRead, final Map<String, Object> parameters, final String contentType) throws IOException {
        final Gson gson = new Gson();

        final StringBuilder stringBuilder = new StringBuilder();
        final URL url = new URL(urlToRead);
        final byte[] postDataBytes = (gson.toJson(parameters)).getBytes("UTF-8");

        final HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-type", contentType);
        conn.setRequestProperty("Content-Lenght", String.valueOf(postDataBytes.length));
        conn.setDoOutput(true);
        conn.getOutputStream().write(postDataBytes);

        final BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String line;
        while ((line = rd.readLine()) != null) {
            stringBuilder.append(line);
        }
        return stringBuilder.toString();

    }
}
